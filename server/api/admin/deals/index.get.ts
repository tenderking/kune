import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { serializeDeal, dealInclude } from '../../../utils/deals'

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
      { title: { contains: search } },
      { description: { contains: search } },
      { service: { name: { contains: search } } },
      { owner: { name: { contains: search } } },
      { owner: { email: { contains: search } } },
    ]
  }

  const deals = await prisma.deal.findMany({
    where,
    orderBy: { created_at: 'desc' },
    include: {
      ...dealInclude(),
      owner: { select: { id: true, name: true, email: true, username: true } },
      _count: { select: { vouchers: true, payments: true } },
    },
  })

  return deals.map(d => ({
    ...serializeDeal(d as any),
    owner: d.owner,
    total_vouchers_count: d._count.vouchers,
    total_payments_count: d._count.payments,
  }))
})
