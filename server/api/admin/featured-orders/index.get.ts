import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { serializeFeaturedOrder } from '../../../utils/featured'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const status = String(query.status || '').trim()

  const where: any = {}
  if (status) {
    where.status = status
  }

  const orders = await prisma.featuredOrder.findMany({
    where,
    orderBy: { created_at: 'desc' },
    include: {
      service: { select: { id: true, name: true, featured: true, featured_until: true } },
      owner: { select: { id: true, name: true, email: true, username: true } },
    },
  })

  return orders.map(o => ({
    ...serializeFeaturedOrder(o),
    owner: o.owner,
    phone: o.phone,
    created_at: o.created_at.toISOString(),
  }))
})
