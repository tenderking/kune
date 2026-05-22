export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = event.context.user
  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid session or user.',
    })
  }

  const res = await prisma.favorite_Services.delete({
    where: {
      user_id_service_id: {
        user_id: user.id,
        service_id: body.service,
      },
    },
  })

  return res
})
