import { requireAdmin } from '../../../../utils/requireAdmin'
import prisma from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'User ID is required.' })
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found.' })
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      emailVerified: new Date(),
    },
    select: {
      id: true,
      email: true,
      emailVerified: true,
    },
  })

  // Clean up any pending email verification token
  await prisma.emailVerificationToken.deleteMany({
    where: { userId: id },
  }).catch(() => {})

  return {
    success: true,
    message: `Email verified for ${updated.email || updated.id}`,
    user: updated,
  }
})
