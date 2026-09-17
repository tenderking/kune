import type { Deal, Services } from '@prisma/client'

type DealWithService = Deal & {
  service: Pick<Services, 'id' | 'name' | 'image_url' | 'website_url' | 'phone_number' | 'address' | 'featured'> & {
    category?: { name: string } | string
  }
}

function money(value: unknown) {
  if (value == null)
    return 0
  const n = Number(value)
  return Number.isFinite(n) ? Number(n.toFixed(2)) : 0
}

export function computeDealLiveStatus(deal: Pick<Deal, 'status' | 'starts_at' | 'ends_at' | 'quantity_sold' | 'quantity_total' | 'min_buyers'>) {
  if (deal.status === 'paused' || deal.status === 'draft' || deal.status === 'failed')
    return deal.status

  const now = Date.now()
  if (now < new Date(deal.starts_at).getTime())
    return 'upcoming'
  if (now > new Date(deal.ends_at).getTime()) {
    if (deal.quantity_sold < deal.min_buyers)
      return 'failed'
    return 'expired'
  }
  if (deal.quantity_sold >= deal.quantity_total)
    return 'sold_out'
  return 'active'
}

export function serializeDeal(deal: DealWithService) {
  const original = money(deal.original_price)
  const price = money(deal.deal_price)
  const remaining = Math.max(deal.quantity_total - deal.quantity_sold, 0)
  const liveStatus = computeDealLiveStatus(deal)
  const category = typeof deal.service.category === 'string'
    ? deal.service.category
    : deal.service.category?.name || ''

  return {
    id: deal.id,
    slug: deal.slug,
    title: deal.title,
    description: deal.description,
    original_price: original,
    deal_price: price,
    currency: deal.currency,
    quantity_total: deal.quantity_total,
    quantity_sold: deal.quantity_sold,
    quantity_remaining: remaining,
    min_buyers: deal.min_buyers,
    starts_at: deal.starts_at.toISOString(),
    ends_at: deal.ends_at.toISOString(),
    status: deal.status,
    live_status: liveStatus,
    redemption_instructions: deal.redemption_instructions,
    terms: deal.terms,
    discount_percent: original > 0 ? Math.round(((original - price) / original) * 100) : 0,
    savings: Number(Math.max(original - price, 0).toFixed(2)),
    is_buyable: liveStatus === 'active' && remaining > 0,
    has_tipped: deal.quantity_sold >= deal.min_buyers,
    buyers_needed: Math.max(deal.min_buyers - deal.quantity_sold, 0),
    is_redeemable: deal.quantity_sold >= deal.min_buyers,
    service: {
      id: deal.service.id,
      name: deal.service.name,
      image_url: deal.service.image_url,
      category,
      website_url: deal.service.website_url,
      phone_number: deal.service.phone_number,
      address: deal.service.address,
      featured: Boolean(deal.service.featured),
    },
  }
}

export function dealInclude() {
  return {
    service: {
      select: {
        id: true,
        name: true,
        image_url: true,
        website_url: true,
        phone_number: true,
        address: true,
        featured: true,
        category: {
          select: { name: true },
        },
      },
    },
  } as const
}

export function assertDealOwnership(deal: { owner_id: string }, userId: string) {
  if (deal.owner_id !== userId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You can only manage deals for your own listings.',
    })
  }
}
