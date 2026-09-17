import { requireUser } from '../../utils/requireUser'
import { serializeFeaturedOrder, activateFeaturedPlacement } from '../../utils/featured'
import { isPaidPaynowStatus, pollPaynow } from '../../utils/paynow'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order id is required.' })
  }

  let order = await prisma.featuredOrder.findUnique({
    where: { id },
    include: { service: true },
  })
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Featured order not found.' })
  }
  if (order.owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'This order belongs to another account.' })
  }

  if (order.status === 'pending' && order.poll_url) {
    try {
      const polled = await pollPaynow(order.poll_url)
      if (polled.paid || isPaidPaynowStatus(polled.status)) {
        await activateFeaturedPlacement(order.id)
        order = await prisma.featuredOrder.findUniqueOrThrow({
          where: { id },
          include: { service: true },
        })
      }
    }
    catch (error) {
      console.error('Featured Paynow poll failed:', error)
    }
  }

  return serializeFeaturedOrder(order)
})
