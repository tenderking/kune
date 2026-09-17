import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { mapPublicService } from '../../../utils/publicService'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const search = String(query.q || '').trim()
  const category = String(query.category || '').trim()
  const featured = query.featured !== undefined && query.featured !== '' ? query.featured === 'true' : undefined

  const where: any = {}

  if (category) {
    where.category = { name: category }
  }

  if (featured !== undefined) {
    where.featured = featured
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { address: { contains: search } },
      { website_url: { contains: search } },
      { service_owner: { name: { contains: search } } },
      { service_owner: { email: { contains: search } } },
    ]
  }

  const services = await prisma.services.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    include: {
      category: true,
      service_tags: { include: { tags: true } },
      service_owner: { select: { id: true, name: true, email: true, username: true } },
      _count: { select: { deals: true, offers: true, favorited_by: true } },
    },
  })

  return services.map(s => ({
    ...mapPublicService(s),
    service_owner_id: s.service_owner_id,
    service_owner: s.service_owner,
    deals_count: s._count.deals,
    favorited_count: s._count.favorited_by,
  }))
})
