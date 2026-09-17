import { createHash } from 'node:crypto'

export type PaymentMethod = 'ecocash' | 'onemoney' | 'innbucks' | 'card'

export function getPaynowConfig() {
  const config = useRuntimeConfig()
  const id = String(config.paynow?.id || '').trim()
  const key = String(config.paynow?.key || '').trim()
  const configured = Boolean(id && key)
  return {
    id,
    key,
    configured,
    initiateUrl: 'https://www.paynow.co.zw/interface/initiatetransaction',
  }
}

export function paynowHash(fields: Record<string, string>, integrationKey: string) {
  const payload = Object.values(fields).join('') + integrationKey
  return createHash('sha512').update(payload).digest('hex').toUpperCase()
}

function parsePaynowBody(body: string) {
  const params = new URLSearchParams(body.replace(/\r/g, ''))
  const result: Record<string, string> = {}
  for (const [key, value] of params.entries())
    result[key.toLowerCase()] = value
  return result
}

export async function initiatePaynowPayment(input: {
  reference: string
  amount: number
  additionalInfo: string
  returnUrl: string
  resultUrl: string
  authEmail: string
  method: PaymentMethod
  phone?: string
}) {
  const paynow = getPaynowConfig()
  if (!paynow.configured) {
    return {
      provider: 'kune_checkout' as const,
      redirectUrl: null,
      pollUrl: null,
      providerRef: input.reference,
    }
  }

  const fields: Record<string, string> = {
    id: paynow.id,
    reference: input.reference,
    amount: input.amount.toFixed(2),
    additionalinfo: input.additionalInfo,
    returnurl: input.returnUrl,
    resulturl: input.resultUrl,
    status: 'Message',
    authemail: input.authEmail || 'buyer@kune.co.zw',
  }
  fields.hash = paynowHash(fields, paynow.key)

  const response = await fetch(paynow.initiateUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
  })
  const raw = await response.text()
  const parsed = parsePaynowBody(raw)
  const status = (parsed.status || '').toLowerCase()

  if (!status.includes('ok') || !parsed.browserurl) {
    console.error('Paynow initiate failed:', raw)
    throw createError({
      statusCode: 502,
      statusMessage: parsed.error || 'Paynow did not accept this payment. Try again or use another method.',
    })
  }

  return {
    provider: 'paynow' as const,
    redirectUrl: decodeURIComponent(parsed.browserurl),
    pollUrl: parsed.pollurl ? decodeURIComponent(parsed.pollurl) : null,
    providerRef: input.reference,
  }
}

export async function pollPaynow(pollUrl: string) {
  const response = await fetch(pollUrl)
  const raw = await response.text()
  const parsed = parsePaynowBody(raw)
  const status = (parsed.status || '').toLowerCase()
  return {
    paid: status === 'paid' || status === 'awaiting delivery' || status === 'delivered',
    cancelled: status === 'cancelled' || status === 'failed',
    status: parsed.status || 'Unknown',
    raw: parsed,
  }
}

export function isPaidPaynowStatus(status: string) {
  const normalized = status.toLowerCase()
  return normalized === 'paid' || normalized === 'awaiting delivery' || normalized === 'delivered'
}

export const PAYMENT_METHODS: PaymentMethod[] = ['ecocash', 'onemoney', 'innbucks', 'card']

export function methodLabel(method: string) {
  switch (method) {
    case 'ecocash': return 'EcoCash'
    case 'onemoney': return 'OneMoney'
    case 'innbucks': return 'InnBucks'
    case 'card': return 'Visa / Mastercard'
    default: return method
  }
}
