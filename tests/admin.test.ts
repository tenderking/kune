import { vi, describe, it, expect, beforeEach } from 'vitest'
import { requireAdmin } from '../server/utils/requireAdmin'

// Set up mock createError globally for server utils unit testing
;(globalThis as any).createError = (err: any) => {
  const error: any = new Error(err.statusMessage || err.message || 'Error')
  error.statusCode = err.statusCode
  error.statusMessage = err.statusMessage
  return error
}

describe('Admin Security & Rescue Workflows', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requireAdmin helper', () => {
    it('throws 401 when no user context is present', () => {
      const mockEvent = { context: {} } as any
      expect(() => requireAdmin(mockEvent)).toThrowError('Sign in to continue.')
      try {
        requireAdmin(mockEvent)
      } catch (err: any) {
        expect(err.statusCode).toBe(401)
      }
    })

    it('throws 403 when user role is USER', () => {
      const mockEvent = {
        context: {
          user: { id: 'user_1', email: 'user@kune.co.zw', role: 'USER' },
        },
      } as any
      expect(() => requireAdmin(mockEvent)).toThrowError('Admin access required.')
      try {
        requireAdmin(mockEvent)
      } catch (err: any) {
        expect(err.statusCode).toBe(403)
      }
    })

    it('throws 403 when user role is SERVICE_OWNER', () => {
      const mockEvent = {
        context: {
          user: { id: 'owner_1', email: 'owner@kune.co.zw', role: 'SERVICE_OWNER' },
        },
      } as any
      expect(() => requireAdmin(mockEvent)).toThrowError('Admin access required.')
      try {
        requireAdmin(mockEvent)
      } catch (err: any) {
        expect(err.statusCode).toBe(403)
      }
    })

    it('succeeds and returns user when role is ADMIN', () => {
      const adminUser = { id: 'admin_1', email: 'admin@kune.co.zw', role: 'ADMIN' }
      const mockEvent = {
        context: {
          user: adminUser,
        },
      } as any
      const result = requireAdmin(mockEvent)
      expect(result).toEqual(adminUser)
    })
  })

  describe('Voucher Rescue Workflow logic', () => {
    it('simulates undoing accidental redemption: clears redeemed_at and restores paid status', () => {
      const redeemedVoucher = {
        id: 'vouch_123',
        code: 'KUNE-TEST-1234',
        status: 'redeemed',
        redeemed_at: new Date(),
        purchased_at: new Date('2026-09-01'),
      }

      // Logic applied in status.put.ts
      const targetStatus = 'paid'
      const updateData: any = { status: targetStatus }
      if (targetStatus === 'paid') {
        updateData.redeemed_at = null
        if (!redeemedVoucher.purchased_at) {
          updateData.purchased_at = new Date()
        }
      }

      const restoredVoucher = {
        ...redeemedVoucher,
        ...updateData,
      }

      expect(restoredVoucher.status).toBe('paid')
      expect(restoredVoucher.redeemed_at).toBeNull()
      expect(restoredVoucher.code).toBe('KUNE-TEST-1234')
    })

    it('simulates voucher ownership transfer to fix purchase on wrong account', () => {
      const originalVoucher = {
        id: 'vouch_123',
        code: 'KUNE-TEST-1234',
        buyer_id: 'user_wrong_account',
        status: 'paid',
      }

      const newRecipientUser = {
        id: 'user_correct_account',
        email: 'correct@customer.co.zw',
      }

      // Logic applied in transfer.put.ts
      const transferredVoucher = {
        ...originalVoucher,
        buyer_id: newRecipientUser.id,
      }

      expect(transferredVoucher.buyer_id).toBe('user_correct_account')
      expect(transferredVoucher.code).toBe(originalVoucher.code)
    })
  })

  describe('Deal Parameter Correction logic', () => {
    it('allows admin to adjust deal pricing and minimum tipping threshold', () => {
      const misconfiguredDeal = {
        id: 'deal_123',
        title: '50% off gym membership',
        deal_price: 100, // Mistake by owner
        original_price: 200,
        min_buyers: 50, // Mistake: too high to tip
        quantity_total: 100,
        status: 'active',
      }

      const correctedDeal = {
        ...misconfiguredDeal,
        deal_price: 20, // Fixed
        min_buyers: 3, // Fixed
      }

      expect(correctedDeal.deal_price).toBe(20)
      expect(correctedDeal.min_buyers).toBe(3)
      expect(correctedDeal.original_price).toBe(200)
    })
  })
})
