import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const [categories, tags] = await Promise.all([
    prisma.categories.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { services: true } },
      },
    }),
    prisma.tags.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { services: true, creators: true } },
      },
    }),
  ])

  return {
    categories: categories.map(c => ({
      id: c.id,
      name: c.name,
      services_count: c._count.services,
    })),
    tags: tags.map(t => ({
      id: t.id,
      name: t.name,
      services_count: t._count.services,
      creators_count: t._count.creators,
    })),
  }
})
