import { hash } from '@node-rs/argon2'
import { isWithinExpirationDate } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export default defineEventHandler(async (event) => {
  try {
    // eslint-disable-next-line no-console
    console.log('Start of password reset handler')
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

    const token_hash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)))
    // eslint-disable-next-line no-console
    console.log('Finding token with hash:', token_hash)
    const token = await prisma.passwordResetToken.findUnique({
      where: {
        token_hash,
      },
    })
    if (!token || !isWithinExpirationDate(token.expiresAt)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired token.',
      })
    }

    if (token) {
      // eslint-disable-next-line no-console
      console.log('Token found:', token)

      await prisma.passwordResetToken.delete({
        where: {
          token_hash,
        },
      })

      try {
        const passwordHash = await hash(newPassword, {
          // recommended minimum parameters
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

        // eslint-disable-next-line no-console
        console.log('Password updated successfully!')
      }
      catch (error) {
        console.error('Error generating password hash or updating user:', error)
        throw createError({
          statusCode: 500,
          message: 'Failed to update password. Please try again later.',
        })
      }

      const session = await lucia.createSession(token.userId, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/',
          'Set-Cookie': sessionCookie.serialize(),
          'Referrer-Policy': 'strict-origin',
        },
      })
    }
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
