import prisma from './prisma'

const BROWSER_UA
  = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const SKIP_IMAGE_HINTS = [
  '1x1',
  'pixel',
  'spacer',
  'tracking',
  'facebook.com/tr',
  'doubleclick',
  'gravatar.com/avatar/0000',
]

export function isUsableImageUrl(url?: string | null): boolean {
  if (!url)
    return false
  const value = url.trim()
  if (!value)
    return false
  if (value.includes('/@fs/'))
    return false
  if (value.includes('placeholder-image'))
    return false
  return /^(https?:\/\/|\/(?!@)|data:image\/)/i.test(value)
}

export function normalizeWebsiteUrl(websiteUrl?: string | null): string | null {
  if (!websiteUrl)
    return null
  const trimmed = websiteUrl.trim()
  if (!trimmed)
    return null
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    return new URL(withProtocol).toString()
  }
  catch {
    return null
  }
}

function resolveUrl(base: string, maybeRelative?: string | null): string | null {
  if (!maybeRelative)
    return null
  const value = maybeRelative.trim().replace(/^['"]|['"]$/g, '')
  if (!value || value.startsWith('data:'))
    return null
  try {
    return new URL(value, base).toString()
  }
  catch {
    return null
  }
}

function shouldSkipImage(url: string): boolean {
  const lower = url.toLowerCase()
  return SKIP_IMAGE_HINTS.some(hint => lower.includes(hint))
}

function firstMetaContent(html: string, keys: string[]): string | null {
  for (const key of keys) {
    const propertyFirst = new RegExp(
      `<meta[^>]+(?:property|name|itemprop)=["']${key}["'][^>]*content=["']([^"']+)["'][^>]*>`,
      'i',
    )
    const contentFirst = new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name|itemprop)=["']${key}["'][^>]*>`,
      'i',
    )
    const match = html.match(propertyFirst) || html.match(contentFirst)
    if (match?.[1])
      return match[1]
  }
  return null
}

function firstLinkHref(html: string, rels: string[]): string | null {
  for (const rel of rels) {
    const relFirst = new RegExp(
      `<link[^>]+rel=["'][^"']*${rel}[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>`,
      'i',
    )
    const hrefFirst = new RegExp(
      `<link[^>]+href=["']([^"']+)["'][^>]*rel=["'][^"']*${rel}[^"']*["'][^>]*>`,
      'i',
    )
    const match = html.match(relFirst) || html.match(hrefFirst)
    if (match?.[1])
      return match[1]
  }
  return null
}

function collectJsonLdImages(html: string): string[] {
  const images: string[] = []
  const scriptRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let scriptMatch: RegExpExecArray | null
  while ((scriptMatch = scriptRe.exec(html))) {
    try {
      const parsed = JSON.parse(scriptMatch[1]!.replace(/^\s*<!--|-->\s*$/g, ''))
      walkJsonLd(parsed, images)
    }
    catch {
      // Ignore invalid JSON-LD blocks
    }
  }
  return images
}

function walkJsonLd(node: unknown, images: string[]): void {
  if (!node)
    return
  if (typeof node === 'string') {
    if (/^https?:\/\//i.test(node) && /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(node))
      images.push(node)
    return
  }
  if (Array.isArray(node)) {
    for (const item of node)
      walkJsonLd(item, images)
    return
  }
  if (typeof node !== 'object')
    return

  const record = node as Record<string, unknown>
  for (const key of ['image', 'thumbnailUrl', 'logo', 'contentUrl', 'url']) {
    const value = record[key]
    if (typeof value === 'string' && /^https?:\/\//i.test(value))
      images.push(value)
    else if (value && typeof value === 'object')
      walkJsonLd(value, images)
  }

  if (record['@graph'])
    walkJsonLd(record['@graph'], images)
}

function firstContentImage(html: string, base: string): string | null {
  const imgRe = /<img\b[^>]*>/gi
  let imgMatch: RegExpExecArray | null
  while ((imgMatch = imgRe.exec(html))) {
    const tag = imgMatch[0]
    if (/\b(?:width|height)\s*=\s*["']?1["']?/i.test(tag))
      continue
    const src = tag.match(/\b(?:src|data-src|data-original)=["']([^"']+)["']/i)?.[1]
    const resolved = resolveUrl(base, src)
    if (!resolved || shouldSkipImage(resolved))
      continue
    if (/\.(svg)(\?|$)/i.test(resolved) && /logo|icon|sprite/i.test(resolved))
      continue
    return resolved
  }
  return null
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const html = await $fetch<string>(url, {
      responseType: 'text',
      timeout: 3500,
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': BROWSER_UA,
      },
      retry: 0,
    })
    return typeof html === 'string' ? html : null
  }
  catch {
    return null
  }
}

export async function fetchServiceImage(websiteUrl?: string | null): Promise<string> {
  const pageUrl = normalizeWebsiteUrl(websiteUrl)
  if (!pageUrl)
    return ''

  const html = await fetchHtml(pageUrl)
  if (!html)
    return ''

  const candidates = [
    firstMetaContent(html, [
      'og:image:secure_url',
      'og:image:url',
      'og:image',
      'twitter:image:src',
      'twitter:image',
      'image',
    ]),
    firstLinkHref(html, ['image_src', 'apple-touch-icon', 'apple-touch-icon-precomposed']),
    ...collectJsonLdImages(html),
    firstContentImage(html, pageUrl),
    firstLinkHref(html, ['apple-touch-icon', 'apple-touch-icon-precomposed']),
  ]

  for (const candidate of candidates) {
    const resolved = resolveUrl(pageUrl, candidate)
    if (resolved && !shouldSkipImage(resolved) && !isTinyIcon(resolved))
      return resolved
  }

  return ''
}

function isTinyIcon(url: string): boolean {
  return /\.ico(\?|$)/i.test(url) || /\/favicon\./i.test(url)
}

export async function resolveStoredServiceImage(
  storedUrl: string | null | undefined,
  websiteUrl?: string | null,
): Promise<string> {
  if (isUsableImageUrl(storedUrl))
    return storedUrl!.trim()
  return fetchServiceImage(websiteUrl)
}

const imageCrawlAttempted = new Set<string>()

export async function enrichMissingServiceImages<T extends { id: string, image_url: string, webUrl?: string | null }>(
  services: T[],
): Promise<T[]> {
  await Promise.all(services.map(async (service) => {
    if (isUsableImageUrl(service.image_url))
      return

    if (imageCrawlAttempted.has(service.id)) {
      service.image_url = ''
      return
    }

    imageCrawlAttempted.add(service.id)
    const crawled = await fetchServiceImage(service.webUrl)
    service.image_url = crawled
    prisma.services.update({
      where: { id: service.id },
      data: { image_url: crawled },
    }).catch(() => {})
  }))
  return services
}
