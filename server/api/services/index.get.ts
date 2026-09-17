import { enrichMissingServiceImages } from '../../utils/serviceImage'
import { mapPublicService, publicServiceSelect } from '../../utils/publicService'
import { expireFeaturedListings } from '../../utils/featured'

export default defineEventHandler(async (event) => {
  await expireFeaturedListings()
  const query = getQuery(event)
  if (query.category) {
    const response = await $fetch(`/api/services/categories/${query.category}`)
    return response
  }
  if (query.tags) {
    const response = await $fetch(`/api/services/tags/${query.tags}`)
    return response
  }
  const order = query.sort === 'asc' || query.sort === 'desc' ? query.sort : 'desc'
  return getAllServices(order)
})

async function getAllServices(order: 'asc' | 'desc' = 'desc') {
  try {
    const services = await prisma.services.findMany({
      orderBy: [
        { featured: 'desc' },
        { description: order },
      ],
      select: publicServiceSelect,
    })
    return enrichMissingServiceImages(services.map(mapPublicService))
  }
  catch (error) {
    console.error(error)
    return []
  }
}
