import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { dealInclude, serializeDeal } from '../../../utils/deals'

function asMoney(value: unknown, field: string) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) {
    throw createError({ statusCode: 400, statusMessage: `${field} must be a valid amount.` })
  }
  return Number(n.toFixed(2))
}

function asInt(value: unknown, field: string, min = 0) {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min) {
    throw createError({ statusCode: 400, statusMessage: `${field} must be an integer of at least ${min}.` })
  }
  return n
}

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal ID is required.' })
  }

  const existing = await prisma.deal.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }

  const body = await readBody(event)

  const originalPrice = body.original_price !== undefined ? asMoney(body.original_price, 'Original price') : existing.original_price
  const dealPrice = body.deal_price !== undefined ? asMoney(body.deal_price, 'Deal price') : existing.deal_price
  const startsAt = body.starts_at ? new Date(body.starts_at) : existing.starts_at
  const endsAt = body.ends_at ? new Date(body.ends_at) : existing.ends_at

  const allowedStatuses = ['active', 'paused', 'draft', 'expired', 'sold_out', 'failed']
  const status = body.status && allowedStatuses.includes(body.status) ? body.status : existing.status

  const quantityTotal = body.quantity_total !== undefined ? asInt(body.quantity_total, 'Total Quantity', 1) : existing.quantity_total
  const quantitySold = body.quantity_sold !== undefined ? asInt(body.quantity_sold, 'Sold Quantity', 0) : existing.quantity_sold
  const minBuyers = body.min_buyers !== undefined ? asInt(body.min_buyers, 'Minimum Buyers', 1) : existing.min_buyers

  const updated = await prisma.deal.update({
    where: { id },
    data: {
      title: body.title !== undefined ? String(body.title).trim() : existing.title,
      description: body.description !== undefined ? String(body.description) : existing.description,
      original_price: originalPrice,
      deal_price: dealPrice,
      currency: body.currency ? String(body.currency).trim() : existing.currency,
      quantity_total: quantityTotal,
      quantity_sold: quantitySold,
      min_buyers: minBuyers,
      starts_at: startsAt,
      ends_at: endsAt,
      status,
      redemption_instructions: body.redemption_instructions !== undefined ? String(body.redemption_instructions) : existing.redemption_instructions,
      terms: body.terms !== undefined ? String(body.terms) : existing.terms,
    },
    include: dealInclude(),
  })

  return serializeDeal(updated as any)
})
