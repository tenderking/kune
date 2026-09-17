import { activateFeaturedPlacement } from '../../../utils/featured'
import { isPaidPaynowStatus, pollPaynow } from '../../../utils/paynow'

export default defineEventHandler(async (event) => {
  const orderId = String(getQuery(event).order || '')
  if (!orderId)
    return sendRedirect(event, '/profile/services')

  const order = await prisma.featuredOrder.findUnique({ where: { id: orderId } })
  if (!order)
    return sendRedirect(event, '/profile/services')

  if (order.status === 'pending' && order.poll_url) {
    try {
      const polled = await pollPaynow(order.poll_url)
      if (polled.paid || isPaidPaynowStatus(polled.status))
        await activateFeaturedPlacement(order.id)
    }
    catch (error) {
      console.error('Featured Paynow return failed:', error)
    }
  }

  return sendRedirect(event, `/profile/services/feature/${order.service_id}?order=${order.id}`)
})
