import { validateSessionToken, setSessionTokenCookie, deleteSessionTokenCookie } from '../utils/auth'
import type { Session, User } from '../utils/auth'

function verifyRequestOrigin(origin: string, allowedDomains: string[]): boolean {
  try {
    const originUrl = new URL(origin)
    return allowedDomains.some((domain) => {
      const hostUrl = new URL(
        domain.startsWith('http://') || domain.startsWith('https://')
          ? domain
          : `http://${domain}`
      )
      return originUrl.host === hostUrl.host
    })
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') {
    const originHeader = getHeader(event, 'Origin') ?? null
    let hostHeader = getHeader(event, 'Host') ?? null

    // Normalize `localhost` variations (remove port if present)
    if (hostHeader?.startsWith('localhost')) {
      if (originHeader?.startsWith('http://localhost') || originHeader?.startsWith('http://127.0.0.1')) {
        hostHeader = originHeader
      } else {
        hostHeader = `http://${hostHeader}`
      }
    }

    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      console.error('Blocked request:', { originHeader, hostHeader })
      return event.node.res.writeHead(403).end()
    }
  }

  const token = getCookie(event, 'auth_session') ?? null
  if (!token) {
    event.context.session = null
    event.context.user = null
    return
  }

  const { session, user } = await validateSessionToken(token)
  if (session) {
    setSessionTokenCookie(event, token, session.expiresAt)
  } else {
    deleteSessionTokenCookie(event)
  }
  event.context.session = session
  event.context.user = user
})

declare module 'h3' {
  interface H3EventContext {
    user: User | null
    session: Session | null
  }
}
