import { dealInclude, serializeDeal } from '../../utils/deals'
import { settleUntippedDeals } from '../../utils/dealSettle'

export default defineEventHandler(async (event) => {
  await settleUntippedDeals()
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal is required.' })
  }

  const deal = await prisma.deal.findFirst({
    where: {
      OR: [{ slug: id }, { id }],
    },
    include: dealInclude(),
  })

  if (!deal) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }

  return serializeDeal(deal)
})
