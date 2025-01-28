export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (query.category) {
    const response = await $fetch(`/api/services/categories/${query.category}`)
    return response
  }
  if (query.tags) {
    const response = await $fetch(`/api/services/tags/${query.tags}`)

    return response
  }
  if (query.sort) {
    const order = query.sort === 'asc' || query.sort === 'desc' ? query.sort : 'asc'
    const response = await getAllServices(order)
    return response
  }
  const services = await getAllServices()
  return services
  // }
})

async function getAllServices(order: 'asc' | 'desc' = 'desc') {
  return prisma.services
    .findMany({
      orderBy: {
        description: order,
      },
      select: {
        name: true,
        description: true,
        category: true,
        service_tags: {
          select: {
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        image_url: true,
        website_url: true,
        phone_number: true,
      },
    })
    .then(services =>
      services.map(service => ({
        name: service.name,
        description: service.description,
        category: service.category.name,
        tags: service.service_tags.map(
          tagOnService => tagOnService.tags.name,
        ),
        webUrl: service.website_url,
        whatsapp: service.phone_number,
        image_url: service.image_url,
      })),
    )
    .catch((error) => {
      console.error(error)
    })
}
