import { vi, describe, it, expect, beforeEach } from 'vitest'
import middleware from '../server/middleware/auth'
import { validateSessionToken, setSessionTokenCookie, deleteSessionTokenCookie } from '../server/utils/auth'

vi.mock('../server/utils/auth', () => {
  return {
    validateSessionToken: vi.fn(),
    setSessionTokenCookie: vi.fn(),
    deleteSessionTokenCookie: vi.fn(),
  }
})

describe('auth middleware', () => {
  let headers: Record<string, string> = {}
  let cookies: Record<string, string> = {}

  beforeEach(() => {
    vi.clearAllMocks()
    headers = {}
    cookies = {}

    vi.mocked(globalThis.getHeader).mockImplementation((event, name) => {
      return headers[name.toLowerCase()] ?? null
    })

    vi.mocked(globalThis.getCookie).mockImplementation((event, name) => {
      return cookies[name] ?? null
    })
  })

  const createMockEvent = (method = 'GET') => {
    const res = {
      writeHead: vi.fn().mockReturnThis(),
      end: vi.fn(),
    }
    return {
      node: {
        req: { method },
        res,
      },
      context: {
        session: undefined,
        user: undefined,
      },
    } as any
  }

  describe('CSRF validation', () => {
    it('bypasses CSRF validation for GET requests', async () => {
      const event = createMockEvent('GET')
      vi.mocked(validateSessionToken).mockResolvedValue({ session: null, user: null })

      await middleware(event)
      expect(event.node.res.writeHead).not.toHaveBeenCalled()
    })

    it('blocks POST requests with missing Origin/Host headers', async () => {
      const event = createMockEvent('POST')
      await middleware(event)
      expect(event.node.res.writeHead).toHaveBeenCalledWith(403)
      expect(event.node.res.end).toHaveBeenCalled()
    })

    it('blocks POST requests when Origin and Host mismatch', async () => {
      const event = createMockEvent('POST')
      headers['origin'] = 'https://attacker.com'
      headers['host'] = 'example.com'

      await middleware(event)
      expect(event.node.res.writeHead).toHaveBeenCalledWith(403)
    })

    it('allows POST requests when Origin and Host match exactly', async () => {
      const event = createMockEvent('POST')
      headers['origin'] = 'https://example.com'
      headers['host'] = 'example.com'
      vi.mocked(validateSessionToken).mockResolvedValue({ session: null, user: null })

      await middleware(event)
      expect(event.node.res.writeHead).not.toHaveBeenCalled()
    })

    it('normalizes localhost variations for local development', async () => {
      const event = createMockEvent('POST')
      headers['origin'] = 'http://localhost:3000'
      headers['host'] = 'localhost:3000'
      vi.mocked(validateSessionToken).mockResolvedValue({ session: null, user: null })

      await middleware(event)
      expect(event.node.res.writeHead).not.toHaveBeenCalled()
    })
  })

  describe('Session resolution', () => {
    it('sets session and user to null if no token is present', async () => {
      const event = createMockEvent('GET')
      await middleware(event)
      expect(event.context.session).toBeNull()
      expect(event.context.user).toBeNull()
    })

    it('deletes cookie and sets null if token is invalid or expired', async () => {
      const event = createMockEvent('GET')
      cookies['auth_session'] = 'invalid-token'
      vi.mocked(validateSessionToken).mockResolvedValue({ session: null, user: null })

      await middleware(event)
      expect(deleteSessionTokenCookie).toHaveBeenCalledWith(event)
      expect(event.context.session).toBeNull()
      expect(event.context.user).toBeNull()
    })

    it('sets context and extends cookie if session is valid', async () => {
      const event = createMockEvent('GET')
      cookies['auth_session'] = 'valid-token'
      const mockSession = { id: 'sess123', userId: 'user1', expiresAt: new Date() }
      const mockUser = { id: 'user1', username: 'john', email: 'john@example.com', name: 'John' }
      vi.mocked(validateSessionToken).mockResolvedValue({ session: mockSession, user: mockUser })

      await middleware(event)
      expect(setSessionTokenCookie).toHaveBeenCalledWith(event, 'valid-token', mockSession.expiresAt)
      expect(event.context.session).toEqual(mockSession)
      expect(event.context.user).toEqual(mockUser)
    })
  })
})
