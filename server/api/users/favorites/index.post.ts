export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = event.context.user
  // eslint-disable-next-line no-console
  console.log({ user })
  const service = await prisma.services.findUnique({
    where: {
      name: body.service,
    },
  })
  if (!service)
    throw createError({ statusCode: 404, message: 'Service not found' })

  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  const res = await prisma.favorite_Services.create({
    data: {
      user_id: user.id || '',
      service_id: service.id,
    },
  })

  return res
})
