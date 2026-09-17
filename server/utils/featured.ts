export function getFeaturedPlacementConfig() {
  const config = useRuntimeConfig()
  const amount = Number(config.featured?.amount || 15)
  const days = Number(config.featured?.days || 30)
  return {
    amount: Number.isFinite(amount) && amount > 0 ? amount : 15,
    days: Number.isFinite(days) && days > 0 ? days : 30,
    currency: String(config.featured?.currency || 'USD'),
  }
}

export async function expireFeaturedListings() {
  const now = new Date()
  await prisma.services.updateMany({
    where: {
      featured: true,
      featured_until: { lt: now },
    },
    data: { featured: false },
  })
}

export async function activateFeaturedPlacement(orderId: string) {
  const order = await prisma.featuredOrder.findUnique({
    where: { id: orderId },
    include: { service: true, owner: true },
  })
  if (!order)
    throw createError({ statusCode: 404, statusMessage: 'Featured order not found.' })
  if (order.status === 'paid')
    return order

  const now = new Date()
  const base = order.service.featured_until && order.service.featured_until > now
    ? order.service.featured_until
    : now
  const ends = new Date(base.getTime() + order.duration_days * 24 * 60 * 60 * 1000)

  const updated = await prisma.$transaction(async (tx) => {
    const paid = await tx.featuredOrder.update({
      where: { id: order.id },
      data: {
        status: 'paid',
        paid_at: now,
        starts_at: now,
        ends_at: ends,
      },
    })
    await tx.services.update({
      where: { id: order.service_id },
      data: {
        featured: true,
        featured_until: ends,
      },
    })
    return paid
  })

  return updated
}

export function serializeFeaturedOrder(order: any) {
  return {
    id: order.id,
    status: order.status,
    amount: Number(order.amount),
    currency: order.currency,
    method: order.method,
    provider: order.provider,
    duration_days: order.duration_days,
    starts_at: order.starts_at?.toISOString?.() || null,
    ends_at: order.ends_at?.toISOString?.() || null,
    service: order.service
      ? { id: order.service.id, name: order.service.name, featured: order.service.featured, featured_until: order.service.featured_until }
      : undefined,
  }
}
