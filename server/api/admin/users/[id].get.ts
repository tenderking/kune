import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'User ID is required.' })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      emailVerified: true,
      image: true,
      owned_services: {
        select: {
          id: true,
          name: true,
          category: { select: { name: true } },
          featured: true,
          featured_until: true,
        },
      },
      owned_deals: {
        select: {
          id: true,
          title: true,
          status: true,
          deal_price: true,
          quantity_sold: true,
          quantity_total: true,
          ends_at: true,
        },
      },
      vouchers: {
        orderBy: { created_at: 'desc' },
        take: 20,
        select: {
          id: true,
          code: true,
          status: true,
          created_at: true,
          purchased_at: true,
          redeemed_at: true,
          deal: { select: { id: true, title: true } },
        },
      },
      payments: {
        orderBy: { created_at: 'desc' },
        take: 20,
        select: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          method: true,
          created_at: true,
          paid_at: true,
        },
      },
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found.' })
  }

  return {
    ...user,
    owned_deals: user.owned_deals.map(d => ({
      ...d,
      deal_price: Number(d.deal_price),
      ends_at: d.ends_at.toISOString(),
    })),
    vouchers: user.vouchers.map(v => ({
      ...v,
      created_at: v.created_at.toISOString(),
      purchased_at: v.purchased_at ? v.purchased_at.toISOString() : null,
      redeemed_at: v.redeemed_at ? v.redeemed_at.toISOString() : null,
    })),
    payments: user.payments.map(p => ({
      ...p,
      amount: Number(p.amount),
      created_at: p.created_at.toISOString(),
      paid_at: p.paid_at ? p.paid_at.toISOString() : null,
    })),
  }
})
