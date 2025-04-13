// server/api/auth/reset-password.post.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const email = formData.get('email')
  // eslint-disable-next-line no-console
  console.log(email)
  if (!email || typeof email !== 'string') {
    throw createError({
      message: 'Invalid email',
      statusCode: 400,
    })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Avoid disclosing valid emails
    return new Response('Invalid email', {
      status: 400,
    })
  }

  const verificationToken = await createPasswordResetToken(user.id)
  const origin = config.origin
  const verificationLink = `${origin}/auth/reset-password/${verificationToken}`
  await sendPasswordResetToken(email, verificationLink)

  return new Response('Password reset email sent', {
    status: 200,
  })
})
