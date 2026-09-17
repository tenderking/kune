import { assertDealOwnership, dealInclude, serializeDeal } from '../../utils/deals'
import { requireUser } from '../../utils/requireUser'

function asMoney(value: unknown, field: string) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) {
    throw createError({ statusCode: 400, statusMessage: `${field} must be a valid amount.` })
  }
  return Number(n.toFixed(2))
}

function asInt(value: unknown, field: string, min = 1) {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min) {
    throw createError({ statusCode: 400, statusMessage: `${field} must be at least ${min}.` })
  }
  return n
}

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal id is required.' })
  }

  const existing = await prisma.deal.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }
  assertDealOwnership(existing, user.id)

  const body = await readBody(event)
  const originalPrice = asMoney(body.original_price ?? existing.original_price, 'Original price')
  const dealPrice = asMoney(body.deal_price ?? existing.deal_price, 'Deal price')
  const startsAt = new Date(body.starts_at || existing.starts_at)
  const endsAt = new Date(body.ends_at || existing.ends_at)
  if (Number.isNaN(endsAt.getTime()) || endsAt <= startsAt) {
    throw createError({ statusCode: 400, statusMessage: 'Deal must have an end date after it starts.' })
  }

  const allowedStatus = ['draft', 'active', 'paused', 'expired']
  const status = allowedStatus.includes(body.status) ? body.status : existing.status

  const updated = await prisma.deal.update({
    where: { id },
    data: {
      title: String(body.title || existing.title).trim(),
      description: String(body.description ?? existing.description),
      original_price: originalPrice,
      deal_price: dealPrice,
      quantity_total: Math.max(asInt(body.quantity_total ?? existing.quantity_total, 'Quantity'), existing.quantity_sold),
      min_buyers: asInt(body.min_buyers ?? existing.min_buyers, 'Minimum buyers', 1),
      starts_at: startsAt,
      ends_at: endsAt,
      status,
      redemption_instructions: String(body.redemption_instructions ?? existing.redemption_instructions),
      terms: String(body.terms ?? existing.terms),
    },
    include: dealInclude(),
  })

  return serializeDeal(updated)
})
