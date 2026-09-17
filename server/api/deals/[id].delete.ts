import { assertDealOwnership } from '../../utils/deals'
import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal id is required.' })
  }

  const deal = await prisma.deal.findUnique({
    where: { id },
    select: { id: true, owner_id: true, quantity_sold: true },
  })
  if (!deal) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }
  assertDealOwnership(deal, user.id)

  if (deal.quantity_sold > 0) {
    const paused = await prisma.deal.update({
      where: { id },
      data: { status: 'paused' },
    })
    return { message: 'Deal paused because vouchers have already been sold.', id: paused.id, status: paused.status }
  }

  await prisma.deal.delete({ where: { id } })
  return { message: 'Deal removed.' }
})
