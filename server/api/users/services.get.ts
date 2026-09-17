export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid session or user.',
    })
  }

  const services = await prisma.services.findMany({
    where: {
      service_owner_id: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      website_url: true,
      image_url: true,
      phone_number: true,
      address: true,
      featured: true,
      featured_until: true,
      service_tags: {
        select: {
          tags: {
            select: { name: true },
          },
        },
      },
    },
  })

  return services.map(service => ({
    id: service.id,
    name: service.name,
    description: service.description,
    category: service.category.name,
    website_url: service.website_url,
    webUrl: service.website_url,
    image_url: service.image_url,
    phone_number: service.phone_number,
    address: service.address,
    featured: service.featured,
    featured_until: service.featured_until,
    tags: service.service_tags.map(tagOnService => tagOnService.tags.name),
  }))
})
