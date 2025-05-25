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
      id: true,
      name: true,
      description: true,
      category: true,
      website_url: true,
      image_url: true,
      phone_number: true,
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
    id: service.id,
    name: service.name,
    description: service.description,
    category: service.category.name,
    website_url: service.website_url,
    image_url: service.image_url,
    phone_number: service.phone_number,
    //  tags: service.service_tags.map(
    //    (tagOnService) => tagOnService.tags.name
    //  ),
  }))

  return transformedServices
})
