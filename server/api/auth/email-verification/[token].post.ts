import { PrismaClient } from '@prisma/client'
import { invalidateUserSessions, generateSessionToken, createSession, setSessionTokenCookie } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const verificationToken = event.context.params?.token

  const token = await prisma.emailVerificationToken.findFirst({
    where: {
      token: verificationToken,
    },
    include: {
      user: true,
    },
  })

  if (!token || new Date() >= token.expiresAt) {
    throw createError({
      statusCode: 400,
      message: 'Token is invalid or expired',
      data: {
        token: 'Token is invalid or expired',
      },
    })
  }

  const userId = token.user.id

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    }),
    prisma.emailVerificationToken.deleteMany({
      where: {
        token: verificationToken,
      },
    }),
  ])

  await invalidateUserSessions(userId)
  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, userId)
  setSessionTokenCookie(event, sessionToken, session.expiresAt)

  return {
    ok: true,
  }
})
