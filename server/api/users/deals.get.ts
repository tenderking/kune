import { dealInclude, serializeDeal } from '../../utils/deals'
import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const deals = await prisma.deal.findMany({
    where: { owner_id: user.id },
    include: dealInclude(),
    orderBy: { created_at: 'desc' },
  })
  return deals.map(serializeDeal)
})
