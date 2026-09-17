import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const type = String(body?.type || 'category').trim().toLowerCase()

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  }

  if (type === 'tag') {
    const existing = await prisma.tags.findUnique({ where: { name } })
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'Tag already exists.' })
    }
    const created = await prisma.tags.create({ data: { name } })
    return { success: true, tag: created }
  }

  const existing = await prisma.categories.findUnique({ where: { name } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Category already exists.' })
  }
  const created = await prisma.categories.create({ data: { name } })
  return { success: true, category: created }
})
