import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export default defineEventHandler(async (event) => {
  // You might want to validate the token format here
  const token = event.context.params?.token ?? ''

  // Validate token with the database
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
  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      token_hash: encodeHex(await sha256(new TextEncoder().encode(token))),
    },
  })

  if (!verificationToken) {
    return false
  }

  return token === 'valid-token'
}
