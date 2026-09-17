import { randomBytes } from 'node:crypto'
import { serializeDeal } from './deals'
import { notifyUser } from './notifications'
import { notifyDealTipped } from './dealSettle'

export function generateVoucherCode() {
  const raw = randomBytes(4).toString('hex').toUpperCase()
  return `KUNE-${raw.slice(0, 4)}-${raw.slice(4, 8)}`
}

export function serializeVoucher(voucher: any) {
  const deal = voucher.deal ? serializeDeal(voucher.deal) : undefined
  const redeemable = voucher.status === 'paid' && Boolean(deal?.is_redeemable)
  return {
    id: voucher.id,
    code: voucher.code,
    status: voucher.status,
    purchased_at: voucher.purchased_at ? voucher.purchased_at.toISOString() : null,
    redeemed_at: voucher.redeemed_at ? voucher.redeemed_at.toISOString() : null,
    created_at: voucher.created_at.toISOString(),
    is_redeemable: redeemable,
    waiting_for_tip: voucher.status === 'paid' && deal ? !deal.has_tipped : false,
    buyer: voucher.buyer
      ? {
          id: voucher.buyer.id,
          name: voucher.buyer.name,
          email: voucher.buyer.email,
        }
      : undefined,
    payment: voucher.payment
      ? {
          id: voucher.payment.id,
          status: voucher.payment.status,
          method: voucher.payment.method,
          provider: voucher.payment.provider,
          amount: Number(voucher.payment.amount),
          currency: voucher.payment.currency,
        }
      : undefined,
    deal,
  }
}

export async function issuePaidVoucher(paymentId: string) {
  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { id: paymentId },
      include: {
        vouchers: true,
        deal: true,
      },
    })

    if (!payment)
      throw createError({ statusCode: 404, statusMessage: 'Payment not found.' })

    if (payment.status === 'paid') {
      const existing = payment.vouchers.find(v => v.status === 'paid' || v.status === 'redeemed')
      return { voucher: existing || payment.vouchers[0], justPaid: false, justTipped: false, deal: payment.deal }
    }

    if (payment.status !== 'pending') {
      throw createError({
        statusCode: 409,
        statusMessage: `Payment cannot be completed from status ${payment.status}.`,
      })
    }

    const remaining = payment.deal.quantity_total - payment.deal.quantity_sold
    if (remaining <= 0 || computeSoldOut(payment.deal)) {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      })
      throw createError({ statusCode: 409, statusMessage: 'This deal is sold out.' })
    }

    const now = new Date()
    let voucher = payment.vouchers[0]
    if (!voucher) {
      voucher = await tx.voucher.create({
        data: {
          code: await uniqueVoucherCode(tx),
          deal_id: payment.deal_id,
          buyer_id: payment.buyer_id,
          payment_id: payment.id,
          status: 'paid',
          purchased_at: now,
        },
      })
    }
    else {
      voucher = await tx.voucher.update({
        where: { id: voucher.id },
        data: {
          status: 'paid',
          purchased_at: now,
        },
      })
    }

    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: 'paid',
        paid_at: now,
      },
    })

    const nextSold = payment.deal.quantity_sold + 1
    const wasTipped = payment.deal.quantity_sold >= payment.deal.min_buyers
    const justTipped = !wasTipped && nextSold >= payment.deal.min_buyers
    await tx.deal.update({
      where: { id: payment.deal_id },
      data: {
        quantity_sold: nextSold,
        status: nextSold >= payment.deal.quantity_total ? 'sold_out' : payment.deal.status,
      },
    })

    return { voucher, justPaid: true, justTipped, deal: payment.deal }
  })

  if (result.justPaid) {
    const buyer = await prisma.user.findUnique({ where: { id: result.voucher.buyer_id } })
    const waiting = (result.deal.quantity_sold + 1) < result.deal.min_buyers
    await notifyUser({
      userId: result.voucher.buyer_id,
      email: buyer?.email,
      type: 'voucher_purchased',
      title: `Receipt: ${result.deal.title}`,
      body: waiting
        ? `Payment received for voucher ${result.voucher.code}. This group-buy still needs more buyers before you can redeem. If it does not tip before it ends, you will be refunded.`
        : `Payment received. Your voucher code is ${result.voucher.code}. Show it to the business to redeem.`,
      link: `/profile/vouchers/${result.voucher.code}`,
      emailSubject: `Your Kune voucher ${result.voucher.code}`,
    })
  }

  if (result.justTipped)
    await notifyDealTipped(result.deal.id)

  return result.voucher
}

function computeSoldOut(deal: { quantity_sold: number, quantity_total: number, ends_at: Date }) {
  return deal.quantity_sold >= deal.quantity_total || Date.now() > deal.ends_at.getTime()
}

async function uniqueVoucherCode(tx: any) {
  for (let i = 0; i < 8; i++) {
    const code = generateVoucherCode()
    const existing = await tx.voucher.findUnique({ where: { code } })
    if (!existing)
      return code
  }
  throw createError({ statusCode: 500, statusMessage: 'Could not issue a unique voucher code.' })
}
