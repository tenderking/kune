import { requireUser } from '../../utils/requireUser'
import { serializeVoucher } from '../../utils/vouchers'
import { dealInclude } from '../../utils/deals'
import { notifyUser } from '../../utils/notifications'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const code = String(body?.code || '').trim().toUpperCase()
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'Enter the voucher code to redeem.' })
  }

  const voucher = await prisma.voucher.findUnique({
    where: { code },
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true } },
      deal: { include: dealInclude() },
    },
  })
  if (!voucher) {
    throw createError({ statusCode: 404, statusMessage: 'No voucher matches that code.' })
  }
  if (voucher.deal.owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Only the listing owner can redeem this voucher.' })
  }
  if (voucher.status === 'refunded') {
    throw createError({ statusCode: 409, statusMessage: 'This voucher was refunded because the deal did not tip.' })
  }
  if (voucher.status !== 'paid') {
    throw createError({
      statusCode: 409,
      statusMessage: voucher.status === 'redeemed'
        ? 'This voucher was already redeemed.'
        : 'This voucher is not paid and cannot be redeemed yet.',
    })
  }
  if (voucher.deal.quantity_sold < voucher.deal.min_buyers) {
    throw createError({
      statusCode: 409,
      statusMessage: `This deal has not tipped yet. ${voucher.deal.min_buyers - voucher.deal.quantity_sold} more buyer(s) needed.`,
    })
  }

  const redeemed = await prisma.voucher.update({
    where: { id: voucher.id },
    data: {
      status: 'redeemed',
      redeemed_at: new Date(),
    },
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true } },
      deal: { include: dealInclude() },
    },
  })

  await notifyUser({
    userId: redeemed.buyer_id,
    email: redeemed.buyer?.email,
    type: 'voucher_redeemed',
    title: `Redeemed: ${redeemed.deal.title}`,
    body: `Voucher ${redeemed.code} was redeemed at ${redeemed.deal.service.name}.`,
    link: `/profile/vouchers/${redeemed.code}`,
    emailSubject: `Your Kune voucher ${redeemed.code} was redeemed`,
  })

  return serializeVoucher(redeemed)
})
