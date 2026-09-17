import { requireUser } from '../../utils/requireUser'
import { serializeVoucher } from '../../utils/vouchers'
import { dealInclude } from '../../utils/deals'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const vouchers = await prisma.voucher.findMany({
    where: {
      deal: { owner_id: user.id },
      status: { in: ['paid', 'redeemed'] },
    },
    include: {
      payment: true,
      buyer: { select: { id: true, name: true, email: true } },
      deal: { include: dealInclude() },
    },
    orderBy: { created_at: 'desc' },
  })
  return vouchers.map(serializeVoucher)
})
