import { requireUser } from '../../utils/requireUser'
import { serializeVoucher } from '../../utils/vouchers'
import { dealInclude } from '../../utils/deals'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const code = decodeURIComponent(getRouterParam(event, 'code') || '').trim().toUpperCase()
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'Voucher code is required.' })
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
    throw createError({ statusCode: 404, statusMessage: 'Voucher not found.' })
  }
  if (voucher.buyer_id !== user.id && voucher.deal.owner_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'You cannot view this voucher.' })
  }

  return serializeVoucher(voucher)
})
