import { assertDealOwnership, dealInclude, serializeDeal } from '../../utils/deals'
import { requireUser } from '../../utils/requireUser'
import { uniqueSlug } from '../../utils/slug'

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
  const body = await readBody(event)

  const serviceId = String(body?.service_id || '').trim()
  const title = String(body?.title || '').trim()
  if (!serviceId || !title) {
    throw createError({ statusCode: 400, statusMessage: 'Service and deal title are required.' })
  }

  const service = await prisma.services.findUnique({
    where: { id: serviceId },
    select: { id: true, service_owner_id: true, name: true },
  })

  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Service listing not found.' })
  }
  if (service.service_owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'You can only create deals for services you own.' })
  }

  const originalPrice = asMoney(body.original_price, 'Original price')
  const dealPrice = asMoney(body.deal_price, 'Deal price')
  if (dealPrice > originalPrice) {
    throw createError({ statusCode: 400, statusMessage: 'Deal price cannot be higher than the original price.' })
  }

  const startsAt = new Date(body.starts_at || Date.now())
  const endsAt = new Date(body.ends_at)
  if (Number.isNaN(endsAt.getTime()) || endsAt <= startsAt) {
    throw createError({ statusCode: 400, statusMessage: 'Deal must have an end date after it starts.' })
  }

  const quantityTotal = asInt(body.quantity_total ?? 20, 'Quantity')
  const minBuyers = asInt(body.min_buyers ?? 1, 'Minimum buyers', 1)
  const status = body.status === 'draft' ? 'draft' : 'active'

  const deal = await prisma.deal.create({
    data: {
      slug: uniqueSlug(title, 'deal'),
      service_id: service.id,
      owner_id: user.id,
      title,
      description: String(body.description || '').trim(),
      original_price: originalPrice,
      deal_price: dealPrice,
      currency: String(body.currency || 'USD').trim().slice(0, 8) || 'USD',
      quantity_total: quantityTotal,
      min_buyers: Math.min(minBuyers, quantityTotal),
      starts_at: startsAt,
      ends_at: endsAt,
      status,
      redemption_instructions: String(body.redemption_instructions || '').trim(),
      terms: String(body.terms || '').trim(),
    },
    include: dealInclude(),
  })

  assertDealOwnership(deal, user.id)
  return serializeDeal(deal)
})
