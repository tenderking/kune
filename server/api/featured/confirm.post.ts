import { requireUser } from '../../utils/requireUser'
import { getPaynowConfig } from '../../utils/paynow'
import { activateFeaturedPlacement, serializeFeaturedOrder } from '../../utils/featured'
import { notifyUser } from '../../utils/notifications'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const id = String(body?.order_id || body?.id || '').trim()
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order id is required.' })
  }

  const order = await prisma.featuredOrder.findUnique({
    where: { id },
    include: { service: true },
  })
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Featured order not found.' })
  }
  if (order.owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'This order belongs to another account.' })
  }
  if (order.status === 'paid') {
    return { status: 'paid', order: serializeFeaturedOrder(order) }
  }
  if (order.provider === 'paynow' && getPaynowConfig().configured) {
    throw createError({
      statusCode: 409,
      statusMessage: 'This payment must be completed with Paynow. Refresh after paying.',
    })
  }
  if (order.status !== 'pending') {
    throw createError({ statusCode: 409, statusMessage: `Order is ${order.status}.` })
  }

  const paid = await activateFeaturedPlacement(order.id)
  await notifyUser({
    userId: user.id,
    email: user.email,
    type: 'featured_purchased',
    title: `Featured: ${order.service.name}`,
    body: `${order.service.name} is now featured on Kune home and browse for ${order.duration_days} days.`,
    link: '/profile/services',
    emailSubject: `Receipt: featured placement for ${order.service.name}`,
  })

  return {
    status: 'paid',
    order: serializeFeaturedOrder({ ...paid, service: order.service }),
  }
})
