import { requireAdmin } from '../../../../utils/requireAdmin'
import prisma from '../../../../utils/prisma'
import { issuePaidVoucher } from '../../../../utils/vouchers'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Payment ID is required.' })
  }

  const existing = await prisma.payment.findUnique({
    where: { id },
    include: { vouchers: true, deal: true },
  })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Payment not found.' })
  }

  const body = await readBody(event)
  const targetStatus = String(body?.status || '').trim().toLowerCase()
  const allowed = ['paid', 'refunded', 'pending', 'failed', 'cancelled']

  if (!allowed.includes(targetStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Status must be one of: ${allowed.join(', ')}`,
    })
  }

  if (targetStatus === 'paid') {
    // If transitioning to paid, run the complete voucher issuance workflow
    const voucher = await issuePaidVoucher(id)
    return {
      success: true,
      message: 'Payment marked as paid and voucher issued.',
      voucher,
    }
  }

  if (targetStatus === 'refunded') {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id },
        data: { status: 'refunded' },
      })
      await tx.voucher.updateMany({
        where: { payment_id: id },
        data: { status: 'refunded' },
      })
    })
    return {
      success: true,
      message: 'Payment and associated vouchers marked as refunded.',
    }
  }

  const updated = await prisma.payment.update({
    where: { id },
    data: { status: targetStatus },
  })

  return {
    success: true,
    message: `Payment status updated to ${targetStatus}.`,
    payment: updated,
  }
})
