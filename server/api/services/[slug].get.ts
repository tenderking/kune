function replaceSpaceSymbol(str: string) {
  return str.replace(/%20/g, " ")
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

  if (!service) {
    throw new Error(`No service found for slug: ${query}`)
  }
  const flattenedService = {
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map((tag) => tag.tags.name),
  }
  return flattenedService
})
