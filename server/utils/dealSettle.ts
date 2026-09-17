import { notifyUser } from './notifications'

export async function settleUntippedDeals() {
  const now = new Date()
  const expired = await prisma.deal.findMany({
    where: {
      ends_at: { lt: now },
      status: { in: ['active', 'sold_out'] },
    },
    include: {
      vouchers: { include: { buyer: true, payment: true } },
      service: { select: { name: true } },
    },
  })

  let refunded = 0
  for (const deal of expired) {
    const tipped = deal.quantity_sold >= deal.min_buyers
    if (tipped) {
      if (deal.status === 'active' && now > deal.ends_at) {
        await prisma.deal.update({
          where: { id: deal.id },
          data: { status: deal.quantity_sold >= deal.quantity_total ? 'sold_out' : 'expired' },
        })
      }
      continue
    }

    await prisma.deal.update({
      where: { id: deal.id },
      data: { status: 'failed' },
    })

    const paidVouchers = deal.vouchers.filter(v => v.status === 'paid')
    for (const voucher of paidVouchers) {
      await prisma.voucher.update({
        where: { id: voucher.id },
        data: { status: 'refunded' },
      })
      if (voucher.payment?.status === 'paid') {
        await prisma.payment.update({
          where: { id: voucher.payment_id },
          data: { status: 'refunded' },
        })
      }
      refunded++
      await notifyUser({
        userId: voucher.buyer_id,
        email: voucher.buyer?.email,
        type: 'voucher_refunded',
        title: `Refund: ${deal.title}`,
        body: `${deal.service.name} did not reach ${deal.min_buyers} buyers before the deal ended. Your voucher ${voucher.code} has been refunded (${deal.currency} ${Number(voucher.payment?.amount || 0).toFixed(2)}). If you paid through Paynow, the refund follows that method once merchant keys are connected.`,
        link: `/profile/vouchers/${voucher.code}`,
        emailSubject: `Kune refund for ${deal.title}`,
      })
    }
  }

  return { refunded }
}

export async function notifyDealTipped(dealId: string) {
  const deal = await prisma.deal.findUnique({
    where: { id: dealId },
    include: {
      service: { select: { name: true } },
      vouchers: {
        where: { status: 'paid' },
        include: { buyer: true },
      },
    },
  })
  if (!deal || deal.quantity_sold < deal.min_buyers)
    return

  for (const voucher of deal.vouchers) {
    await notifyUser({
      userId: voucher.buyer_id,
      email: voucher.buyer?.email,
      type: 'deal_tipped',
      title: `Deal is on: ${deal.title}`,
      body: `${deal.service.name} reached the group-buy minimum. Show voucher ${voucher.code} to redeem.`,
      link: `/profile/vouchers/${voucher.code}`,
      emailSubject: `Your ${deal.title} voucher is ready to redeem`,
    })
  }
}
