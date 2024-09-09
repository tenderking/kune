import { authOptions } from '../../auth/[...]'
import { getServerSession } from '#auth'
import { handleError } from '~/server/utils/utils'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event, authOptions)
    if (!session || !session.user || !session.user.email)
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    const userId = await getUserFromDB(session.user.email)
    if (!userId)
      throw new Error('User not found')

    const favoriteServices = await prisma.user.findUnique({
      where: { id: userId.id },
      include: {
        favorite_services: {
          include: {
            favorited_service: true,
          },
        },
      },
    })

    if (!favoriteServices || favoriteServices.favorite_services.length === 0) {
      handleError('No favorite services found for this user')
      return null
    }

    const services = favoriteServices.favorite_services.map(fav => fav.favorited_service)
    // eslint-disable-next-line no-console
    console.log({ services })
    return services
  }
  catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    })
  }
})
