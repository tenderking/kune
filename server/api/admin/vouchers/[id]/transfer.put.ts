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
  const targetEmailOrId = String(body?.recipient || body?.email || body?.userId || '').trim()

  if (!targetEmailOrId) {
    throw createError({ statusCode: 400, statusMessage: 'Specify the recipient user ID or email address.' })
  }

  const newOwner = await prisma.user.findFirst({
    where: {
      OR: [
        { id: targetEmailOrId },
        { email: targetEmailOrId.toLowerCase() },
        { username: targetEmailOrId },
      ],
    },
  })

  if (!newOwner) {
    throw createError({ statusCode: 404, statusMessage: `No user account found matching "${targetEmailOrId}".` })
  }

  if (newOwner.id === existing.buyer_id) {
    throw createError({ statusCode: 400, statusMessage: 'Voucher is already owned by this user.' })
  }

  const updated = await prisma.voucher.update({
    where: { id },
    data: {
      buyer_id: newOwner.id,
    },
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true } },
      deal: { include: dealInclude() },
    },
  })

  // Notify the new recipient
  await notifyUser({
    userId: newOwner.id,
    email: newOwner.email,
    type: 'voucher_transferred',
    title: `Voucher Transferred: ${updated.deal.title}`,
    body: `Voucher ${updated.code} has been transferred to your Kune account by administrator support.`,
    link: `/profile/vouchers/${updated.code}`,
    emailSubject: `You received a Kune voucher: ${updated.code}`,
  })

  // Also notify the previous owner
  if (existing.buyer) {
    await notifyUser({
      userId: existing.buyer_id,
      email: existing.buyer.email,
      type: 'voucher_transferred_out',
      title: `Voucher Transferred: ${existing.deal.title}`,
      body: `Your voucher ${existing.code} was transferred to ${newOwner.email || newOwner.name} by support.`,
      link: '/profile/vouchers',
      emailSubject: `Your Kune voucher ${existing.code} was transferred`,
    })
  }

  return serializeVoucher(updated)
})
