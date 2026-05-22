import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const token = event.context.params?.token ?? ''

  const isValidToken = await validateTokenWithDatabase(token)

  if (!isValidToken) {
    return new Response(null, {
      status: 401,
      headers: {
        'Referrer-Policy': 'strict-origin',
      },
    })
  }

  return new Response(null, {
    status: 200,
    headers: {
      'Referrer-Policy': 'strict-origin',
    },
  })
})

async function validateTokenWithDatabase(token: string): Promise<boolean> {
  const tokenHash = createHash('sha256').update(token).digest('hex')
  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      token_hash: tokenHash,
    },
  })

  if (!verificationToken) {
    return false
  }

  return new Date() < verificationToken.expiresAt
}
