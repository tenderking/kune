import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const search = String(query.q || '').trim()
  const role = String(query.role || '').trim()
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))
  const skip = (page - 1) * limit

  const where: any = {}

  if (role) {
    where.role = role
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { username: { contains: search } },
      { id: { contains: search } },
    ]
  }

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        emailVerified: true,
        image: true,
        _count: {
          select: {
            owned_services: true,
            owned_deals: true,
            vouchers: true,
            payments: true,
          },
        },
      },
    }),
  ])

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
})
