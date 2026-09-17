import { isPaidPaynowStatus } from '../../../utils/paynow'
import { issuePaidVoucher } from '../../../utils/vouchers'
import { activateFeaturedPlacement } from '../../../utils/featured'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const query = getQuery(event)
  const reference = String(body?.reference || body?.Reference || query.reference || query.guid || '').trim()
  const status = String(body?.status || body?.Status || '').trim()

  if (!reference) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Paynow reference.' })
  }

  const featuredId = reference.startsWith('feat_') ? reference.slice(5) : reference
  const featured = await prisma.featuredOrder.findFirst({
    where: { OR: [{ id: featuredId }, { provider_ref: reference }] },
  })
  if (featured) {
    if (isPaidPaynowStatus(status) && featured.status === 'pending')
      await activateFeaturedPlacement(featured.id)
    return { ok: true }
  }

  const payment = await prisma.payment.findFirst({
    where: {
      OR: [{ id: reference }, { provider_ref: reference }],
    },
  })
  if (!payment) {
    throw createError({ statusCode: 404, statusMessage: 'Payment not found.' })
  }

  if (isPaidPaynowStatus(status) || payment.poll_url) {
    if (isPaidPaynowStatus(status) || payment.status === 'pending') {
      try {
        await issuePaidVoucher(payment.id)
      }
      catch (error: any) {
        if (error?.statusCode !== 409)
          console.error('Paynow result handling failed:', error)
      }
    }
  }
  else if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'failed') {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: status.toLowerCase() === 'failed' ? 'failed' : 'cancelled' },
    })
  }

  return { ok: true }
})
