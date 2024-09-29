import { handleError } from '~/server/utils/utils'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    const favoriteServices = await prisma.user.findUnique({
      where: { id: user?.id },
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
