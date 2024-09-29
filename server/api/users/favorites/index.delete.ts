export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = event.context.user

  const res = await prisma.favorite_Services.delete({
    where: {
      user_id_service_id: {
        user_id: user?.id || '',
        service_id: body.service,
      },
    },
  })

  return res
})
