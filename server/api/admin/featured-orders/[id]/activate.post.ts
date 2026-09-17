import { requireAdmin } from '../../../../utils/requireAdmin'
import { activateFeaturedPlacement, serializeFeaturedOrder } from '../../../../utils/featured'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order ID is required.' })
  }

  const activated = await activateFeaturedPlacement(id)
  return {
    success: true,
    message: 'Featured placement activated.',
    order: serializeFeaturedOrder(activated),
  }
})
