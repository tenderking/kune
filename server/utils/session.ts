import type { H3Event, SessionConfig } from 'h3'

const sessionConfig: SessionConfig = useRuntimeConfig().auth || {}

export interface AuthSession {
  id: string
  name: string
  email: string
}

export async function useAuthSession(event: H3Event) {
  const session = await useSession<AuthSession>(event, sessionConfig)
  return session
}

export async function requireAuthSession(event: H3Event) {
  const session = await useAuthSession(event)
  if (!session.data.email) {
    throw createError({
      message: 'Not Authorized',
      statusCode: 401,
    })
  }
  return session
}
