import type { H3Event } from 'h3'
import { requireUser } from './requireUser'

export function requireAdmin(event: H3Event) {
  const user = requireUser(event)
  if (user.role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required.',
    })
  }
  return user
}
