export default defineEventHandler(async (event) => {
  //  get services by tag
  const query = event.context.params?.tag
  const services = await prisma.services.findMany({
    where: {
      service_tags: {
        some: {
          tags: {
            name: query,
          },
        },
      },
    },
    select: {
      name: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      service_tags: {
        select: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  if (!services)
    throw new Error(`No services found for tag: ${query}`)

  const flattenedServices = services.map(service => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map(tag => tag.tags.name),
  }))
  return flattenedServices
})
