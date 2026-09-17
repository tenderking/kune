import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal ID is required.' })
  }

  const existing = await prisma.deal.findUnique({
    where: { id },
    include: { _count: { select: { vouchers: true, payments: true } } },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }

  if (existing._count.vouchers > 0 || existing._count.payments > 0) {
    // If vouchers or payments exist, soft-delete by setting status to failed or expired rather than breaking foreign keys
    await prisma.deal.update({
      where: { id },
      data: { status: 'failed' },
    })
    return { success: true, message: 'Deal had purchases; status was changed to "failed".' }
  }

  await prisma.deal.delete({ where: { id } })
  return { success: true, message: `Deal "${existing.title}" was deleted.` }
})
