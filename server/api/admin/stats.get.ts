import { requireAdmin } from '../../utils/requireAdmin'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const [
    totalUsers,
    totalServices,
    featuredServices,
    totalDeals,
    activeDeals,
    totalVouchers,
    paidVouchers,
    redeemedVouchers,
    refundedVouchers,
    totalPayments,
    paidPayments,
    pendingPayments,
    recentVouchers,
    recentPayments,
    recentUsers,
    revenueAgg,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.services.count(),
    prisma.services.count({ where: { featured: true } }),
    prisma.deal.count(),
    prisma.deal.count({ where: { status: 'active' } }),
    prisma.voucher.count(),
    prisma.voucher.count({ where: { status: 'paid' } }),
    prisma.voucher.count({ where: { status: 'redeemed' } }),
    prisma.voucher.count({ where: { status: 'refunded' } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: 'paid' } }),
    prisma.payment.count({ where: { status: 'pending' } }),
    prisma.voucher.findMany({
      take: 6,
      orderBy: { created_at: 'desc' },
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        deal: { select: { id: true, title: true, deal_price: true, currency: true } },
        payment: { select: { id: true, status: true, amount: true, currency: true } },
      },
    }),
    prisma.payment.findMany({
      take: 6,
      orderBy: { created_at: 'desc' },
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        deal: { select: { id: true, title: true } },
      },
    }),
    prisma.user.findMany({
      take: 6,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        emailVerified: true,
      },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'paid' },
    }),
  ])

  return {
    overview: {
      totalUsers,
      totalServices,
      featuredServices,
      totalDeals,
      activeDeals,
      totalVouchers,
      paidVouchers,
      redeemedVouchers,
      refundedVouchers,
      totalPayments,
      paidPayments,
      pendingPayments,
      totalRevenue: Number(revenueAgg._sum.amount || 0),
    },
    recentVouchers: recentVouchers.map(v => ({
      id: v.id,
      code: v.code,
      status: v.status,
      purchased_at: v.purchased_at ? v.purchased_at.toISOString() : null,
      redeemed_at: v.redeemed_at ? v.redeemed_at.toISOString() : null,
      created_at: v.created_at ? v.created_at.toISOString() : null,
      buyer: v.buyer,
      deal: v.deal ? { id: v.deal.id, title: v.deal.title, deal_price: Number(v.deal.deal_price), currency: v.deal.currency } : null,
      payment: v.payment ? { id: v.payment.id, status: v.payment.status, amount: Number(v.payment.amount), currency: v.payment.currency } : null,
    })),
    recentPayments: recentPayments.map(p => ({
      id: p.id,
      amount: Number(p.amount),
      currency: p.currency,
      status: p.status,
      method: p.method,
      phone: p.phone,
      created_at: p.created_at ? p.created_at.toISOString() : null,
      paid_at: p.paid_at ? p.paid_at.toISOString() : null,
      buyer: p.buyer,
      deal: p.deal,
    })),
    recentUsers,
  }
})
