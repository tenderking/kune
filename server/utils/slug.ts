import { randomBytes } from 'node:crypto'

export function slugify(value: string, fallback = 'item') {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  return slug || fallback
}

export function uniqueSlug(value: string, fallback = 'item') {
  const base = slugify(value, fallback)
  const suffix = randomBytes(3).toString('hex')
  return `${base}-${suffix}`
}
