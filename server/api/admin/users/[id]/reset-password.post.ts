import { hash } from '@node-rs/argon2'
import { randomBytes } from 'node:crypto'
import { requireAdmin } from '../../../../utils/requireAdmin'
import prisma from '../../../../utils/prisma'
import { notifyUser } from '../../../../utils/notifications'

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

  const body = await readBody(event).catch(() => ({}))
  let newPassword = String(body?.newPassword || '').trim()

  if (!newPassword) {
    // Generate a secure temporary password if none supplied
    newPassword = `KunePass_${randomBytes(4).toString('hex')}!`
  }

  const passwordHash = await hash(newPassword, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  await prisma.user.update({
    where: { id },
    data: { password_hash: passwordHash },
  })

  // Invalidate previous sessions
  await prisma.session.deleteMany({ where: { userId: id } }).catch(() => {})

  if (user.email) {
    await notifyUser({
      userId: user.id,
      email: user.email,
      type: 'password_reset_by_admin',
      title: 'Password reset by admin',
      body: 'An administrator has reset your password. You can now log in with your updated credentials.',
      link: '/login',
      emailSubject: 'Your Kune password was reset',
    })
  }

  return {
    success: true,
    message: 'Password updated successfully.',
    temporaryPassword: newPassword,
  }
})
