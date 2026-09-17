import type { H3Event } from 'h3'

export function requireUser(event: H3Event) {
  const user = event.context.user
  if (!user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sign in to continue.',
    })
  }
  return user
}
