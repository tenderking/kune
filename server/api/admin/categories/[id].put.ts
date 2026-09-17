import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Category ID is required.' })
  }

  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Category name is required.' })
  }

  const existing = await prisma.categories.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found.' })
  }

  if (name !== existing.name) {
    const duplicate = await prisma.categories.findUnique({ where: { name } })
    if (duplicate && duplicate.id !== id) {
      throw createError({ statusCode: 409, statusMessage: 'Another category already uses this name.' })
    }
  }

  const updated = await prisma.categories.update({
    where: { id },
    data: { name },
  })

  return updated
})
