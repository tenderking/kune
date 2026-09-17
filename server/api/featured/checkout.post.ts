import { requireUser } from '../../utils/requireUser'
import { PAYMENT_METHODS, getPaynowConfig, initiatePaynowPayment, type PaymentMethod } from '../../utils/paynow'
import { getFeaturedPlacementConfig } from '../../utils/featured'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const serviceId = String(body?.service_id || '').trim()
  const method = String(body?.method || 'ecocash') as PaymentMethod
  const phone = String(body?.phone || '').trim()

  if (!serviceId) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a listing to feature.' })
  }
  if (!PAYMENT_METHODS.includes(method)) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a valid payment method.' })
  }
  if (method !== 'card' && !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Mobile money payments need the paying phone number.' })
  }

  const service = await prisma.services.findUnique({
    where: { id: serviceId },
    select: { id: true, name: true, service_owner_id: true },
  })
  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found.' })
  }
  if (service.service_owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'You can only feature a listing you own.' })
  }

  const placement = getFeaturedPlacementConfig()
  const order = await prisma.featuredOrder.create({
    data: {
      service_id: service.id,
      owner_id: user.id,
      provider: getPaynowConfig().configured ? 'paynow' : 'kune_checkout',
      amount: placement.amount,
      currency: placement.currency,
      status: 'pending',
      method,
      phone,
      duration_days: placement.days,
    },
  })

  const origin = getRequestURL(event).origin
  const initiated = await initiatePaynowPayment({
    reference: `feat_${order.id}`,
    amount: placement.amount,
    additionalInfo: `Featured placement: ${service.name}`,
    returnUrl: `${origin}/api/featured/paynow/return?order=${order.id}`,
    resultUrl: `${origin}/api/payments/paynow/result`,
    authEmail: user.email || 'owner@kune.co.zw',
    method,
    phone,
  })

  await prisma.featuredOrder.update({
    where: { id: order.id },
    data: {
      provider: initiated.provider,
      provider_ref: initiated.providerRef,
      poll_url: initiated.pollUrl,
    },
  })

  return {
    order_id: order.id,
    provider: initiated.provider,
    status: 'pending',
    amount: placement.amount,
    currency: placement.currency,
    days: placement.days,
    redirect_url: initiated.redirectUrl,
    checkout_path: `/profile/services/feature/${service.id}?order=${order.id}`,
  }
})
