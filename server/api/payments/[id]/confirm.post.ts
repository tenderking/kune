import { requireUser } from '../../../utils/requireUser'
import { getPaynowConfig } from '../../../utils/paynow'
import { issuePaidVoucher, serializeVoucher } from '../../../utils/vouchers'
import { dealInclude } from '../../../utils/deals'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Payment id is required.' })
  }

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      vouchers: true,
      deal: { include: dealInclude() },
    },
  })
  if (!payment) {
    throw createError({ statusCode: 404, statusMessage: 'Payment not found.' })
  }
  if (payment.buyer_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'This payment belongs to another account.' })
  }
  if (payment.status === 'paid') {
    return {
      status: 'paid',
      voucher: serializeVoucher({ ...payment.vouchers[0], deal: payment.deal, payment }),
    }
  }
  if (payment.provider === 'paynow' && getPaynowConfig().configured) {
    throw createError({
      statusCode: 409,
      statusMessage: 'This payment must be completed with Paynow. Refresh after paying.',
    })
  }
  if (payment.status !== 'pending') {
    throw createError({
      statusCode: 409,
      statusMessage: `Payment is ${payment.status} and cannot be confirmed.`,
    })
  }

  const voucher = await issuePaidVoucher(payment.id)
  const paid = await prisma.voucher.findUniqueOrThrow({
    where: { id: voucher.id },
    include: {
      payment: true,
      deal: { include: dealInclude() },
    },
  })

  return {
    status: 'paid',
    voucher: serializeVoucher(paid),
  }
})
