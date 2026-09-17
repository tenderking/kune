import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const id = String(body?.id || body?.service_id || '').trim()
  const featured = Boolean(body?.featured)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Service ID is required.' })
  }

  const service = await prisma.services.findUnique({
    where: { id },
    select: { id: true, service_owner_id: true, featured: true, featured_until: true },
  })
  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }

  const isOwner = service.service_owner_id === user.id
  const isAdmin = user.role === 'ADMIN'
  if (!isOwner && !isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only the listing owner can change featured placement.',
    })
  }

  if (featured && !isAdmin) {
    throw createError({
      statusCode: 402,
      statusMessage: 'Featured placement is a paid upgrade. Complete checkout to spotlight this listing.',
      data: { checkout: `/profile/services/feature/${id}` },
    })
  }

  const updated = await prisma.services.update({
    where: { id },
    data: {
      featured,
      featured_until: featured ? service.featured_until : null,
    },
    select: { id: true, name: true, featured: true, featured_until: true },
  })

  return updated
})
