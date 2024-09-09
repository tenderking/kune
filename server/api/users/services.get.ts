import { authOptions } from '../auth/[...]'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions)
  const user = event.context.sessions ? event.context.sessions.user.id : event.context.params?.user
  // eslint-disable-next-line no-console
  console.log('session', session)
  // eslint-disable-next-line no-console
  console.log('user', user)
  // get services by user
  const services = await prisma.services.findMany({
    where: {
      service_owner: {
        id: 'cluen2o0d000011yn1tfbcozg',
      },
    },
    select: {
      name: true,
      description: true,
      category: true,
      // service_tags: {
      //   select: {
      //     tags: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //   },
      // },
    },
  })

  const transformedServices = services.map(service => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    //  tags: service.service_tags.map(
    //    (tagOnService) => tagOnService.tags.name
    //  ),
  }))

  return transformedServices
})
