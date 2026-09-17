import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import isValidEmail from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'User ID is required.' })
  }

  const body = await readBody(event)

  const existing = await prisma.user.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'User not found.' })
  }

  const email = body.email !== undefined ? String(body.email || '').trim().toLowerCase() : existing.email
  if (email && !isValidEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a valid email address.' })
  }

  if (email && email !== existing.email) {
    const duplicate = await prisma.user.findUnique({ where: { email } })
    if (duplicate && duplicate.id !== id) {
      throw createError({ statusCode: 409, statusMessage: 'Another account already uses this email address.' })
    }
  }

  const username = body.username !== undefined ? (body.username ? String(body.username).trim() : null) : existing.username
  if (username && username !== existing.username) {
    const duplicate = await prisma.user.findUnique({ where: { username } })
    if (duplicate && duplicate.id !== id) {
      throw createError({ statusCode: 409, statusMessage: 'Another account already uses this username.' })
    }
  }

  const allowedRoles = ['USER', 'SERVICE_OWNER', 'CONTENT_CREATOR_MANAGER', 'ADMIN']
  const role = body.role !== undefined ? String(body.role).trim() : existing.role
  if (role && !allowedRoles.includes(role)) {
    throw createError({ statusCode: 400, statusMessage: `Role must be one of: ${allowedRoles.join(', ')}` })
  }

  let emailVerified = existing.emailVerified
  if (body.emailVerified !== undefined) {
    emailVerified = body.emailVerified ? (existing.emailVerified || new Date()) : null
  }

  const name = body.name !== undefined ? (body.name ? String(body.name).trim() : null) : existing.name

  const updated = await prisma.user.update({
    where: { id },
    data: {
      email,
      username,
      name,
      role,
      emailVerified,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      emailVerified: true,
      image: true,
    },
  })

  return updated
})
