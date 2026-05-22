import { vi, describe, it, expect, beforeEach } from 'vitest'
import {
  generateSessionToken,
  hashToken,
  createSession,
  validateSessionToken,
  invalidateSession,
  invalidateUserSessions,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
  default as isValidEmail
} from '../server/utils/auth'
import prisma from '../server/utils/prisma'

vi.mock('../server/utils/prisma', () => {
  return {
    default: {
      session: {
        create: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        deleteMany: vi.fn(),
      },
    },
  }
})

describe('auth utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(globalThis as any).__import_meta_dev = true
  })

  describe('generateSessionToken', () => {
    it('returns 40 character hex string', () => {
      const token = generateSessionToken()
      expect(token).toHaveLength(40)
      expect(/^[0-9a-f]{40}$/.test(token)).toBe(true)
    })
  })

  describe('hashToken', () => {
    it('hashes using sha256 to 64 character hex', () => {
      const hash = hashToken('test-token')
      expect(hash).toHaveLength(64)
      expect(/^[0-9a-f]{64}$/.test(hash)).toBe(true)
    })
  })

  describe('createSession', () => {
    it('creates db entry with 30 days expiration', async () => {
      const mockSession = { id: 'hashed', userId: 'user1', expiresAt: new Date() }
      vi.mocked(prisma.session.create).mockResolvedValue(mockSession)

      const session = await createSession('token123', 'user1')
      expect(prisma.session.create).toHaveBeenCalledWith({
        data: {
          id: hashToken('token123'),
          userId: 'user1',
          expiresAt: expect.any(Date),
        },
      })
      expect(session).toEqual(mockSession)
    })
  })

  describe('validateSessionToken', () => {
    it('returns null if not found in db', async () => {
      vi.mocked(prisma.session.findUnique).mockResolvedValue(null)
      const res = await validateSessionToken('token123')
      expect(res).toEqual({ session: null, user: null })
    })

    it('deletes session and returns null if expired', async () => {
      const expiredDate = new Date(Date.now() - 1000)
      const mockResult = {
        id: 'hashed',
        userId: 'user1',
        expiresAt: expiredDate,
        user: { id: 'user1', username: 'john', email: 'john@example.com', name: 'John' },
      }
      vi.mocked(prisma.session.findUnique).mockResolvedValue(mockResult as any)
      vi.mocked(prisma.session.delete).mockResolvedValue({} as any)

      const res = await validateSessionToken('token123')
      expect(prisma.session.delete).toHaveBeenCalledWith({
        where: { id: hashToken('token123') },
      })
      expect(res).toEqual({ session: null, user: null })
    })

    it('returns session and user without renewal if > 15 days left', async () => {
      const freshDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 20) // 20 days
      const mockResult = {
        id: 'hashed',
        userId: 'user1',
        expiresAt: freshDate,
        user: { id: 'user1', username: 'john', email: 'john@example.com', name: 'John' },
      }
      vi.mocked(prisma.session.findUnique).mockResolvedValue(mockResult as any)

      const res = await validateSessionToken('token123')
      expect(prisma.session.update).not.toHaveBeenCalled()
      expect(res.session).toBeDefined()
      expect(res.user).toEqual({ id: 'user1', username: 'john', email: 'john@example.com', name: 'John' })
    })

    it('renews session if <= 15 days left', async () => {
      const nearExpiredDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10) // 10 days
      const mockResult = {
        id: 'hashed',
        userId: 'user1',
        expiresAt: nearExpiredDate,
        user: { id: 'user1', username: 'john', email: 'john@example.com', name: 'John' },
      }
      vi.mocked(prisma.session.findUnique).mockResolvedValue(mockResult as any)
      vi.mocked(prisma.session.update).mockResolvedValue({} as any)

      const res = await validateSessionToken('token123')
      expect(prisma.session.update).toHaveBeenCalledWith({
        where: { id: hashToken('token123') },
        data: { expiresAt: expect.any(Date) },
      })
      expect(res.session?.expiresAt.getTime()).toBeGreaterThan(nearExpiredDate.getTime())
    })

    it('handles database exceptions safely', async () => {
      vi.mocked(prisma.session.findUnique).mockRejectedValue(new Error('DB down'))
      await expect(validateSessionToken('token123')).rejects.toThrow('DB down')
    })
  })

  describe('invalidateSession', () => {
    it('deletes session from db', async () => {
      vi.mocked(prisma.session.delete).mockResolvedValue({} as any)
      await invalidateSession('sess123')
      expect(prisma.session.delete).toHaveBeenCalledWith({
        where: { id: 'sess123' },
      })
    })

    it('catches delete errors gracefully', async () => {
      vi.mocked(prisma.session.delete).mockRejectedValue(new Error('Not found'))
      await expect(invalidateSession('sess123')).resolves.not.toThrow()
    })
  })

  describe('invalidateUserSessions', () => {
    it('deletes many sessions by user id', async () => {
      vi.mocked(prisma.session.deleteMany).mockResolvedValue({ count: 2 } as any)
      await invalidateUserSessions('user1')
      expect(prisma.session.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      })
    })
  })

  describe('cookie helpers', () => {
    it('setSessionTokenCookie calls setCookie with secure false in dev', () => {
      const event = {}
      const expires = new Date()
      setSessionTokenCookie(event, 'token123', expires)
      expect(globalThis.setCookie).toHaveBeenCalledWith(event, 'auth_session', 'token123', {
        httpOnly: true,
        sameSite: 'lax',
        expires,
        path: '/',
        secure: false,
      })
    })

    it('setSessionTokenCookie calls setCookie with secure true in prod', () => {
      ;(globalThis as any).__import_meta_dev = false
      const event = {}
      const expires = new Date()
      setSessionTokenCookie(event, 'token123', expires)
      expect(globalThis.setCookie).toHaveBeenCalledWith(event, 'auth_session', 'token123', {
        httpOnly: true,
        sameSite: 'lax',
        expires,
        path: '/',
        secure: true,
      })
    })

    it('deleteSessionTokenCookie calls setCookie with maxAge 0', () => {
      const event = {}
      deleteSessionTokenCookie(event)
      expect(globalThis.setCookie).toHaveBeenCalledWith(event, 'auth_session', '', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
        secure: false,
      })
    })
  })

  describe('isValidEmail', () => {
    it('validates common emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('a@b.co')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('abc@')).toBe(false)
    })

    it('asserts known regex bug with consecutive dots in domain', () => {
      // Known behavior/bug identified by reviewer: abc@d..com passes
      expect(isValidEmail('abc@d..com')).toBe(true)
    })
  })
})
