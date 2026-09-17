import { computeDealLiveStatus, dealInclude } from '../../utils/deals'
import { generateVoucherCode } from '../../utils/vouchers'
import { PAYMENT_METHODS, getPaynowConfig, initiatePaynowPayment, type PaymentMethod } from '../../utils/paynow'
import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const dealId = String(body?.deal_id || body?.slug || '').trim()
  const method = String(body?.method || 'ecocash') as PaymentMethod
  const phone = String(body?.phone || '').trim()

  if (!dealId) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a deal to buy.' })
  }
  if (!PAYMENT_METHODS.includes(method)) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a valid payment method.' })
  }
  if (method !== 'card' && !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Mobile money payments need the paying phone number.' })
  }

  const deal = await prisma.deal.findFirst({
    where: { OR: [{ id: dealId }, { slug: dealId }] },
    include: dealInclude(),
  })
  if (!deal) {
    throw createError({ statusCode: 404, statusMessage: 'Deal not found.' })
  }

  const liveStatus = computeDealLiveStatus(deal)
  if (liveStatus !== 'active') {
    throw createError({ statusCode: 409, statusMessage: 'This deal is not available to buy right now.' })
  }
  if (deal.owner_id === user.id) {
    throw createError({ statusCode: 403, statusMessage: 'You cannot buy a deal on your own listing.' })
  }

  const amount = Number(deal.deal_price)
  const payment = await prisma.payment.create({
    data: {
      provider: getPaynowConfig().configured ? 'paynow' : 'kune_checkout',
      amount,
      currency: deal.currency,
      status: 'pending',
      method,
      buyer_id: user.id,
      deal_id: deal.id,
      phone,
      vouchers: {
        create: {
          code: generateVoucherCode(),
          deal_id: deal.id,
          buyer_id: user.id,
          status: 'pending',
        },
      },
    },
  })

  const origin = getRequestURL(event).origin
  const initiated = await initiatePaynowPayment({
    reference: payment.id,
    amount,
    additionalInfo: `${deal.title} voucher`,
    returnUrl: `${origin}/api/payments/paynow/return?payment=${payment.id}`,
    resultUrl: `${origin}/api/payments/paynow/result`,
    authEmail: user.email || 'buyer@kune.co.zw',
    method,
    phone,
  })

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      provider: initiated.provider,
      provider_ref: initiated.providerRef,
      poll_url: initiated.pollUrl,
    },
  })

  return {
    payment_id: payment.id,
    provider: initiated.provider,
    status: 'pending',
    amount,
    currency: deal.currency,
    method,
    redirect_url: initiated.redirectUrl,
    checkout_path: `/deals/${deal.slug}/checkout?payment=${payment.id}`,
  }
})
