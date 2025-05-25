import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export default defineEventHandler(async (event) => {
  const serviceId = event.context.params?.id

  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Service ID is required.',
    })
  }

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null
  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No session found.',
    })
  }

  const { user } = await lucia.validateSession(sessionId)
  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid session or user.',
    })
  }
  const userId = user.id

  try {
    const service = await prisma.services.findUniqueOrThrow({
      where: { id: serviceId },
      select: { service_owner_id: true }, // Only select necessary field for ownership check
    })

    if (service.service_owner_id !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: You are not authorized to edit this service.',
      })
    }

    // Placeholder for actual update logic
    setResponseStatus(event, 200)
    return { message: 'Edit endpoint reached. Full implementation pending.' }
  }
  catch (error: any) {
    if (error.statusCode === 400 || error.statusCode === 401 || error.statusCode === 403) {
      // Re-throw specific, already-created errors
      throw error
    }
    // Prisma's P2025 is 'Record to update not found.' - findUniqueOrThrow handles this.
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Prisma error in PUT [id].put.ts:', error.message)
      // Provide a generic message for DB errors unless it's a specific one we want to expose
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.code}`,
      })
    }
    console.error('Error in PUT [id].put.ts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred while attempting to process the request.',
    })
  }
})
