export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null
  if (!sessionId) {
    event.context.session = null
    event.context.user = null
    return
  }

  const { user } = await lucia.validateSession(sessionId)
  const services = await prisma.services.findMany({
    where: {
      service_owner: {
        id: user?.id,
      },
    },
    select: {
      name: true,
      description: true,
      category: true,
      // service_tags: {
      //   select: {
      //     tags: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //   },
      // },
    },
  })

  const transformedServices = services.map(service => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    //  tags: service.service_tags.map(
    //    (tagOnService) => tagOnService.tags.name
    //  ),
  }))

  return transformedServices
})
