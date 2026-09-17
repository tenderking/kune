import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const search = String(query.q || '').trim()
  const status = String(query.status || '').trim()

  const where: any = {}

  if (status) {
    where.status = status
  }

  if (search) {
    where.OR = [
      { id: { contains: search } },
      { provider_ref: { contains: search } },
      { phone: { contains: search } },
      { buyer: { email: { contains: search } } },
      { buyer: { name: { contains: search } } },
      { deal: { title: { contains: search } } },
    ]
  }

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { created_at: 'desc' },
    include: {
      buyer: { select: { id: true, name: true, email: true } },
      deal: {
        select: {
          id: true,
          title: true,
          service: { select: { id: true, name: true } },
        },
      },
      vouchers: {
        select: {
          id: true,
          code: true,
          status: true,
        },
      },
    },
  })

  return payments.map(p => ({
    id: p.id,
    provider: p.provider,
    provider_ref: p.provider_ref,
    amount: Number(p.amount),
    currency: p.currency,
    status: p.status,
    method: p.method,
    phone: p.phone,
    paid_at: p.paid_at ? p.paid_at.toISOString() : null,
    created_at: p.created_at.toISOString(),
    buyer: p.buyer,
    deal: p.deal,
    vouchers: p.vouchers,
  }))
})
