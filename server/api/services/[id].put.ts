import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { fetchServiceImage, isUsableImageUrl } from '../../utils/serviceImage'

export default defineEventHandler(async (event) => {
  const serviceId = getRouterParam(event, 'id') || getRouterParam(event, 'slug')

  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Service ID is required.',
    })
  }

  const user = event.context.user
  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid session or user.',
    })
  }
  const userId = user.id

  const body = await readBody(event)
  const tags: string[] = Array.isArray(body?.tags) && body.tags.length
    ? body.tags.map((tag: string) => String(tag).trim()).filter(Boolean)
    : ['General']

  try {
    const service = await prisma.services.findUniqueOrThrow({
      where: { id: serviceId },
      select: { service_owner_id: true, website_url: true, image_url: true },
    })

    if (service.service_owner_id !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: You are not authorized to edit this service.',
      })
    }

    const categoryName = String(body?.category || '').trim()
    if (!body?.name || !categoryName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Service name and category are required.',
      })
    }

    const category = await prisma.categories.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    })

    let imageUrl = typeof body.imgUrl === 'string' ? body.imgUrl.trim() : ''
    const websiteUrl = typeof body.website === 'string' ? body.website.trim() : service.website_url
    if (!isUsableImageUrl(imageUrl))
      imageUrl = await fetchServiceImage(websiteUrl)

    const updated = await prisma.services.update({
      where: { id: serviceId },
      data: {
        name: body.name,
        description: body.description || '',
        address: body.address || '',
        website_url: websiteUrl || '',
        image_url: imageUrl || '',
        phone_number: body.phone_number || undefined,
        category: {
          connect: { id: category.id },
        },
        service_tags: {
          deleteMany: {},
          create: tags.map(tagName => ({
            tags: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
    })

    setResponseStatus(event, 200)
    return updated
  }
  catch (error: any) {
    if (error.statusCode)
      throw error

    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Prisma error in PUT [id].put.ts:', error.message)
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
