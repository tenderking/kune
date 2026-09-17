import { requireAdmin } from '../../../utils/requireAdmin'
import { settleUntippedDeals } from '../../../utils/dealSettle'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const result = await settleUntippedDeals()
  return {
    success: true,
    message: `Settlement complete. ${result.refunded} voucher(s) were refunded.`,
    ...result,
  }
})
