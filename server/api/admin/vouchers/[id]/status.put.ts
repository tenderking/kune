import { requireAdmin } from '../../../../utils/requireAdmin'
import prisma from '../../../../utils/prisma'
import { serializeVoucher } from '../../../../utils/vouchers'
import { dealInclude } from '../../../../utils/deals'
import { notifyUser } from '../../../../utils/notifications'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Voucher ID is required.' })
  }

  const existing = await prisma.voucher.findUnique({
    where: { id },
    include: {
      buyer: true,
      deal: { include: dealInclude() },
      payment: true,
    },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Voucher not found.' })
  }

  const body = await readBody(event)
  const targetStatus = String(body?.status || '').trim().toLowerCase()
  const allowed = ['paid', 'redeemed', 'refunded', 'pending', 'expired']

  if (!allowed.includes(targetStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Status must be one of: ${allowed.join(', ')}`,
    })
  }

  const data: any = {
    status: targetStatus,
  }

  if (targetStatus === 'paid') {
    // If reverting to paid (undoing redemption or refund), clear redeemed_at and ensure purchased_at is set
    data.redeemed_at = null
    if (!existing.purchased_at) {
      data.purchased_at = new Date()
    }
  } else if (targetStatus === 'redeemed') {
    data.redeemed_at = new Date()
    if (!existing.purchased_at) {
      data.purchased_at = new Date()
    }
  }

  const updated = await prisma.voucher.update({
    where: { id },
    data,
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true } },
      deal: { include: dealInclude() },
    },
  })

  // Notify customer of the status restoration/update
  if (targetStatus === 'paid' && existing.status === 'redeemed') {
    await notifyUser({
      userId: updated.buyer_id,
      email: updated.buyer?.email,
      type: 'voucher_restored',
      title: `Voucher Restored: ${updated.deal.title}`,
      body: `Your voucher ${updated.code} has been restored to active status by support and is ready to use again.`,
      link: `/profile/vouchers/${updated.code}`,
      emailSubject: `Your Kune voucher ${updated.code} has been restored`,
    })
  }

  return serializeVoucher(updated)
})
