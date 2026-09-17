import { invalidateSession, deleteSessionTokenCookie } from '~/server/utils/auth'

export default eventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({
      statusCode: 403,
    })
  }
  await invalidateSession(event.context.session.id)
  deleteSessionTokenCookie(event)
})
