import { requireUser } from '../../utils/requireUser'
import { isPaidPaynowStatus, pollPaynow } from '../../utils/paynow'
import { issuePaidVoucher, serializeVoucher } from '../../utils/vouchers'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Payment id is required.' })
  }

  let payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      vouchers: true,
      deal: { include: { service: { include: { category: true } } } },
    },
  })
  if (!payment) {
    throw createError({ statusCode: 404, statusMessage: 'Payment not found.' })
  }
  if (payment.buyer_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'This payment belongs to another account.' })
  }

  if (payment.status === 'pending' && payment.poll_url) {
    try {
      const polled = await pollPaynow(payment.poll_url)
      if (polled.paid || isPaidPaynowStatus(polled.status)) {
        await issuePaidVoucher(payment.id)
        payment = await prisma.payment.findUniqueOrThrow({
          where: { id },
          include: {
            vouchers: true,
            deal: { include: { service: { include: { category: true } } } },
          },
        })
      }
      else if (polled.cancelled) {
        await prisma.payment.update({
          where: { id },
          data: { status: 'cancelled' },
        })
        payment = { ...payment, status: 'cancelled' }
      }
    }
    catch (error) {
      console.error('Paynow poll failed:', error)
    }
  }

  const voucher = payment.vouchers[0]
  return {
    id: payment.id,
    status: payment.status,
    provider: payment.provider,
    method: payment.method,
    amount: Number(payment.amount),
    currency: payment.currency,
    voucher: voucher
      ? serializeVoucher({
          ...voucher,
          payment,
          deal: payment.deal,
        })
      : null,
  }
})
