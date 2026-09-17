import { requireAdmin } from '../../../../utils/requireAdmin'
import prisma from '../../../../utils/prisma'
import { dealInclude } from '../../../../utils/deals'
import { notifyUser } from '../../../../utils/notifications'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Voucher ID is required.' })
  }

  const voucher = await prisma.voucher.findUnique({
    where: { id },
    include: {
      buyer: true,
      deal: { include: dealInclude() },
      payment: true,
    },
  })
  if (!voucher) {
    throw createError({ statusCode: 404, statusMessage: 'Voucher not found.' })
  }

  const waiting = voucher.deal.quantity_sold < voucher.deal.min_buyers

  await notifyUser({
    userId: voucher.buyer_id,
    email: voucher.buyer?.email,
    type: 'voucher_resend',
    title: `Receipt (Resent): ${voucher.deal.title}`,
    body: waiting
      ? `Resent receipt for voucher ${voucher.code}. This group-buy deal needs ${voucher.deal.min_buyers - voucher.deal.quantity_sold} more buyers before you can redeem.`
      : `Resent receipt: Your active voucher code is ${voucher.code}. Show it at ${voucher.deal.service.name} to redeem.`,
    link: `/profile/vouchers/${voucher.code}`,
    emailSubject: `Your Kune voucher code: ${voucher.code}`,
  })

  return {
    success: true,
    message: `Voucher notification resent to ${voucher.buyer?.email || voucher.buyer?.name || voucher.buyer_id}.`,
  }
})
