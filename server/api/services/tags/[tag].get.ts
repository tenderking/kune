import { enrichMissingServiceImages } from '../../../utils/serviceImage'
import { mapPublicService, publicServiceSelect } from '../../../utils/publicService'

export default defineEventHandler(async (event) => {
  const query = event.context.params?.tag
  const services = await prisma.services.findMany({
    where: {
      service_tags: {
        some: {
          tags: { name: query },
        },
      },
    },
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    select: publicServiceSelect,
  })
  return enrichMissingServiceImages(services.map(mapPublicService))
})
