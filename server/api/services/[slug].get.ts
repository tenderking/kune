function replaceSpaceSymbol(str: string) {
  return str.replace(/%20/g, ' ')
}

export default defineEventHandler(async (event) => {
  const query = replaceSpaceSymbol(event.context.params?.slug as string)
  //  get service by slug

  const service = await prisma.services.findUnique({
    where: {
      name: query,
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
      website_url: true,
      phone_number: true,
    },
  })

  if (!service)
    throw new Error(`No service found for slug: ${query}`)

  const flattenedService = {
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map(tag => tag.tags.name),
    webUrl: service.website_url,
    whatsapp: service.phone_number,
  }
  return flattenedService
})
