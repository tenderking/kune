import { enrichMissingServiceImages } from '../../utils/serviceImage'
import replaceSpaceSymbol from '../../utils/utils'
import { mapPublicService, publicServiceSelect } from '../../utils/publicService'
import { dealInclude, serializeDeal } from '../../utils/deals'

export default defineEventHandler(async (event) => {
  const serviceParam = getRouterParam(event, 'slug') || getRouterParam(event, 'id')

  if (!serviceParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing slug parameter',
    })
  }

  const query = replaceSpaceSymbol(serviceParam)

  const service = await prisma.services.findFirst({
    where: {
      OR: [
        { id: serviceParam },
        { name: query },
      ],
    },
    select: publicServiceSelect,
  })

  if (!service) {
    throw createError({
      statusCode: 404,
      statusMessage: `No service found for: ${query}`,
    })
  }

  const now = new Date()
  const deals = await prisma.deal.findMany({
    where: {
      service_id: service.id,
      status: { in: ['active', 'sold_out'] },
      starts_at: { lte: now },
    },
    include: dealInclude(),
    orderBy: { ends_at: 'asc' },
  })

  const [flattened] = await enrichMissingServiceImages([mapPublicService(service)])
  return {
    ...flattened,
    deals: deals.map(serializeDeal).filter(deal => deal.live_status === 'active' || deal.live_status === 'sold_out'),
  }
})
