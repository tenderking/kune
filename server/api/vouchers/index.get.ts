import { requireUser } from '../../utils/requireUser'
import { serializeVoucher } from '../../utils/vouchers'
import { dealInclude } from '../../utils/deals'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const vouchers = await prisma.voucher.findMany({
    where: { buyer_id: user.id },
    include: {
      payment: true,
      deal: { include: dealInclude() },
    },
    orderBy: { created_at: 'desc' },
  })
  return vouchers.map(serializeVoucher)
})
