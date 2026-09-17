import { isPaidPaynowStatus, pollPaynow } from '../../../utils/paynow'
import { issuePaidVoucher } from '../../../utils/vouchers'

export default defineEventHandler(async (event) => {
  const paymentId = String(getQuery(event).payment || '')
  if (!paymentId) {
    return sendRedirect(event, '/deals')
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { deal: true, vouchers: true },
  })
  if (!payment) {
    return sendRedirect(event, '/deals')
  }

  if (payment.status === 'pending' && payment.poll_url) {
    try {
      const polled = await pollPaynow(payment.poll_url)
      if (polled.paid || isPaidPaynowStatus(polled.status))
        await issuePaidVoucher(payment.id)
    }
    catch (error) {
      console.error('Paynow return poll failed:', error)
    }
  }

  const voucher = payment.vouchers[0]
  const paid = await prisma.payment.findUnique({ where: { id: payment.id } })
  if (paid?.status === 'paid' && voucher) {
    return sendRedirect(event, `/profile/vouchers/${voucher.code}`)
  }

  return sendRedirect(event, `/deals/${payment.deal.slug}/checkout?payment=${payment.id}`)
})
