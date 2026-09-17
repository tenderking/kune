import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Service ID is required.' })
  }

  const existing = await prisma.services.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }

  await prisma.$transaction(async (tx) => {
    await tx.serviceTags.deleteMany({ where: { services_id: id } })
    await tx.favorite_Services.deleteMany({ where: { service_id: id } })
    await tx.offers.deleteMany({ where: { service_id: id } })
    await tx.services.delete({ where: { id } })
  })

  return { success: true, message: `Service "${existing.name}" was deleted.` }
})
