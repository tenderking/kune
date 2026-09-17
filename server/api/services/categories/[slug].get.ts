import { enrichMissingServiceImages } from '../../../utils/serviceImage'
import replaceSpaceSymbol from '../../../utils/utils'
import { mapPublicService, publicServiceSelect } from '../../../utils/publicService'

export default defineEventHandler(async (event) => {
  const query = replaceSpaceSymbol(event.context.params?.slug as string)
  const services = await prisma.services.findMany({
    where: {
      category: { name: query },
    },
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    select: publicServiceSelect,
  })
  return enrichMissingServiceImages(services.map(mapPublicService))
})
