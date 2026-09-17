import { createHash } from 'node:crypto'
import { hash } from '@node-rs/argon2'
import { generateSessionToken, createSession, setSessionTokenCookie } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const newPassword = body.password

    if (typeof newPassword !== 'string' || newPassword.length < 6 || newPassword.length > 255) {
      throw createError({
        statusCode: 400,
        message: 'Invalid password',
      })
    }

    if (!event.context.params) {
      throw createError({
        statusCode: 400,
        message: 'Missing token.',
      })
    }

    const verificationToken = event.context.params.token
    const tokenHash = createHash('sha256').update(verificationToken).digest('hex')

    const token = await prisma.passwordResetToken.findUnique({
      where: {
        token_hash: tokenHash,
      },
    })

    if (!token || new Date() >= token.expiresAt) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired token.',
      })
    }

    await prisma.passwordResetToken.delete({
      where: {
        token_hash: tokenHash,
      },
    })

    try {
      const passwordHash = await hash(newPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      await prisma.user.update({
        where: {
          id: token.userId,
        },
        data: {
          password_hash: passwordHash,
        },
      })
    }
    catch (error) {
      console.error('Error generating password hash or updating user:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to update password. Please try again later.',
      })
    }

    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, token.userId)
    setSessionTokenCookie(event, sessionToken, session.expiresAt)

    setHeader(event, 'Referrer-Policy', 'strict-origin')
    return sendRedirect(event, '/', 302)
  }
  catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      })
    }
    else {
      return new Response('An unknown error occurred.', {
        status: 500,
      })
    }
  }
})
