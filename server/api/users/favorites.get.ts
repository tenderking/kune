import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session') ?? null
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No session cookie found.',
    })
  }

  const user = event.context.user
  if (!user || !user.id) {
    setResponseStatus(event, 200) // Still a successful request, just no data for this user/session
    return []
  }
  const userId = user.id

  try {
    const favoriteEntries = await prisma.favorite_Services.findMany({
      where: {
        user_id: userId,
      },
      select: {
        service_id: true,
      },
    })

    const favoriteServiceIds = favoriteEntries.map(fav => fav.service_id)

    setResponseStatus(event, 200)
    return favoriteServiceIds
  }
  catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Prisma error fetching user favorites:', error.message)
      throw createError({
        statusCode: 500,
        statusMessage: `Database error while fetching favorites: ${error.code}`,
      })
    }
    console.error('Error fetching user favorites:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred while fetching user favorites.',
    })
  }
})
