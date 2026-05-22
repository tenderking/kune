export default defineEventHandler(async (event) => {
  const serviceParam = getRouterParam(event, 'slug') || getRouterParam(event, 'id')

  if (!serviceParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing slug parameter',
    })
  }
  const query = replaceSpaceSymbol(serviceParam as string)
  //  get service by service name

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

  if (!service) {
    throw new Error(`No service found for slug: ${query}`)
  }

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

function replaceSpaceSymbol(str: string) {
  if (!str) {
    // Or handle this case appropriately, e.g., by returning a default value or throwing a custom error
    throw new Error('Input string to replaceSpaceSymbol is undefined')
  }
  return str.replace(/%20/g, ' ')
}
