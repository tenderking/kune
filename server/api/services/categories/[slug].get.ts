export default defineEventHandler(async (event) => {
  const query = replaceSpaceSymbol(event.context.params?.slug as string)
 //  get service by category
  const services = await prisma.services.findMany({
    where: {
      category: {
        name: query,
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
  const flattenedServices = services.map((service) => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map((tag) => tag.tags.name),
  }))
  return flattenedServices
})

function replaceSpaceSymbol(str: string) {
  return str.replace(/%20/g, " ")
}