export default defineEventHandler(async (event) => {
//  add services to favorites
  const body = await readBody(event)
  const user = event.context.params?.user
  if (!user)
    throw new Error('User not found')

  const res = await prisma.favorite_Services.create({
    data: {
      user_id: user,
      service_id: body.serviceId,
    },
  })

  return res
})
