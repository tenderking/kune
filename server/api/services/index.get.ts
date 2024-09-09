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

  const services = await getAllServices()
  return services
  // }
})

async function getAllServices() {
  return prisma.services
    .findMany({
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
      })),
    )
    .catch((error) => {
      console.error(error)
    })
}
