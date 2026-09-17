import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Category ID is required.' })
  }

  const existing = await prisma.categories.findUnique({
    where: { id },
    include: { _count: { select: { services: true } } },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found.' })
  }

  if (existing._count.services > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: `Cannot delete category "${existing.name}" because it still has ${existing._count.services} service(s) assigned. Reassign them first.`,
    })
  }

  await prisma.categories.delete({ where: { id } })
  return { success: true, message: `Category "${existing.name}" was deleted.` }
})
