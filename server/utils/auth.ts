import { randomBytes, createHash } from 'node:crypto'
import prisma from './prisma'

export interface User {
  id: string
  username: string | null
  email: string | null
  name: string | null
}

export interface Session {
  id: string
  userId: string
  expiresAt: Date
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null }

export function generateSessionToken(): string {
  return randomBytes(20).toString('hex')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = hashToken(token)
  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  })
  return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = hashToken(token)
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  })

  if (!result || !result.user) {
    return { session: null, user: null }
  }

  const { user, ...session } = result

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    }).catch(() => {})
    return { session: null, user: null }
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: newExpiresAt,
      },
    })
    session.expiresAt = newExpiresAt
  }

  const userAttributes: User = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
  }

  return { session, user: userAttributes }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  }).catch(() => {})
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  })
}

export function setSessionTokenCookie(event: any, token: string, expiresAt: Date): void {
  setCookie(event, 'auth_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
    secure: !import.meta.dev,
  })
}

export function deleteSessionTokenCookie(event: any): void {
  setCookie(event, 'auth_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
    secure: !import.meta.dev,
  })
}

export default function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)
}
