import { requireAdmin } from '../../../utils/requireAdmin'
import prisma from '../../../utils/prisma'
import { fetchServiceImage, isUsableImageUrl } from '../../../utils/serviceImage'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Service ID is required.' })
  }

  const existing = await prisma.services.findUnique({
    where: { id },
    include: { category: true, service_tags: { include: { tags: true } } },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }

  const body = await readBody(event)

  const name = body.name !== undefined ? String(body.name).trim() : existing.name
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Service name cannot be empty.' })
  }

  if (name !== existing.name) {
    const duplicate = await prisma.services.findUnique({ where: { name } })
    if (duplicate && duplicate.id !== id) {
      throw createError({ statusCode: 409, statusMessage: 'A service with this name already exists.' })
    }
  }

  const categoryName = body.category !== undefined ? String(body.category).trim() : existing.category.name
  let categoryId = existing.category_id
  if (categoryName && categoryName !== existing.category.name) {
    const category = await prisma.categories.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    })
    categoryId = category.id
  }

  const websiteUrl = body.website !== undefined || body.website_url !== undefined
    ? String(body.website || body.website_url || '').trim()
    : existing.website_url

  let imageUrl = body.imgUrl !== undefined || body.image_url !== undefined
    ? String(body.imgUrl || body.image_url || '').trim()
    : existing.image_url

  if (imageUrl && !isUsableImageUrl(imageUrl) && websiteUrl) {
    imageUrl = await fetchServiceImage(websiteUrl)
  }

  let serviceOwnerId = existing.service_owner_id
  if (body.service_owner_id !== undefined) {
    if (body.service_owner_id === null || body.service_owner_id === '') {
      serviceOwnerId = null
    } else {
      const owner = await prisma.user.findUnique({ where: { id: body.service_owner_id } })
      if (!owner) {
        throw createError({ statusCode: 400, statusMessage: 'Assigned owner user not found.' })
      }
      serviceOwnerId = owner.id
    }
  }

  let featured = existing.featured
  let featuredUntil = existing.featured_until
  if (body.featured !== undefined) {
    featured = Boolean(body.featured)
    if (body.featured_until !== undefined) {
      featuredUntil = body.featured_until ? new Date(body.featured_until) : null
    } else if (featured && !featuredUntil) {
      // Default 30 days if enabling without date
      const future = new Date()
      future.setDate(future.getDate() + 30)
      featuredUntil = future
    } else if (!featured) {
      featuredUntil = null
    }
  }

  const tags: string[] = Array.isArray(body?.tags)
    ? body.tags.map((t: string) => String(t).trim()).filter(Boolean)
    : existing.service_tags.map(st => st.tags.name)

  const updated = await prisma.services.update({
    where: { id },
    data: {
      name,
      description: body.description !== undefined ? String(body.description) : existing.description,
      address: body.address !== undefined ? String(body.address) : existing.address,
      phone_number: body.phone_number !== undefined ? String(body.phone_number) : existing.phone_number,
      website_url: websiteUrl,
      image_url: imageUrl,
      service_owner_id: serviceOwnerId,
      category_id: categoryId,
      featured,
      featured_until: featuredUntil,
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
    include: {
      category: true,
      service_tags: { include: { tags: true } },
      service_owner: { select: { id: true, name: true, email: true } },
    },
  })

  return updated
})
