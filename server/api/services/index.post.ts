import { fetchServiceImage, isUsableImageUrl } from '../../utils/serviceImage'
import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const categoryName = String(body?.category || '').trim()
  if (!name || !categoryName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Service name and category are required.',
    })
  }

  const tags: string[] = Array.isArray(body?.tags) && body.tags.length
    ? body.tags.map((tag: string) => String(tag).trim()).filter(Boolean)
    : ['General']

  const category = await prisma.categories.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  })

  let imageUrl = typeof body.imgUrl === 'string' ? body.imgUrl.trim() : ''
  const websiteUrl = typeof body.website === 'string' ? body.website.trim() : ''
  if (!isUsableImageUrl(imageUrl) && websiteUrl)
    imageUrl = await fetchServiceImage(websiteUrl)

  const res = await prisma.services.create({
    data: {
      name,
      description: String(body.description || ''),
      category: {
        connect: { id: category.id },
      },
      service_owner: {
        connect: { id: user.id },
      },
      website_url: websiteUrl || '',
      image_url: imageUrl || '',
      address: body.address || '',
      phone_number: body.phone_number || '',
      featured: false,
      service_tags: {
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

  return res
})
