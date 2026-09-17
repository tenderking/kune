import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { serializeVoucher } from '../../../utils/vouchers'
import { dealInclude } from '../../../utils/deals'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const search = String(query.q || '').trim().toUpperCase()
  const status = String(query.status || '').trim()
  const dealId = String(query.deal_id || '').trim()

  const where: any = {}

  if (status) {
    where.status = status
  }

  if (dealId) {
    where.deal_id = dealId
  }

  if (search) {
    where.OR = [
      { code: { contains: search } },
      { buyer: { email: { contains: search } } },
      { buyer: { name: { contains: search } } },
      { deal: { title: { contains: search } } },
      { payment: { id: { contains: search } } },
    ]
  }

  const vouchers = await prisma.voucher.findMany({
    where,
    orderBy: { created_at: 'desc' },
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true, username: true } },
      deal: {
        include: {
          ...dealInclude(),
          owner: { select: { id: true, name: true, email: true } },
        },
      },
    },
  })

  return vouchers.map(v => ({
    ...serializeVoucher(v),
    deal_owner: (v.deal as any)?.owner,
  }))
})
