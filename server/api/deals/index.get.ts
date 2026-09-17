import { dealInclude, serializeDeal } from '../../utils/deals'
import { settleUntippedDeals } from '../../utils/dealSettle'

export default defineEventHandler(async () => {
  await settleUntippedDeals()
  const now = new Date()
  const deals = await prisma.deal.findMany({
    where: {
      status: { in: ['active', 'sold_out'] },
      starts_at: { lte: now },
      ends_at: { gte: now },
    },
    include: dealInclude(),
    orderBy: { ends_at: 'asc' },
  })

  return deals
    .map(serializeDeal)
    .filter(deal => deal.live_status === 'active' || deal.live_status === 'sold_out')
})
