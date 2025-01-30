import  nodemailer from 'nodemailer';
// server/api/auth/reset-password.post.ts
import { PrismaClient } from '@prisma/client'
import { generateIdFromEntropySize } from 'lucia'
import { createDate, TimeSpan } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

const prisma = new PrismaClient()
 const config = useRuntimeConfig()
  const smtpHost = config.nodemailer.host
  const smtpPort = config.nodemailer.port
  const smtpUser = config.nodemailer.from
  const smtpPass = config.nodemailer.password

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
console.log("email and verificationLink", email, verificationLink)
  await sendPasswordResetToken(email, verificationLink)

  return new Response('Password reset email sent', {
    status: 200,
  })
})

export async function createPasswordResetToken(userId: string): Promise<string> {
  // Invalidate all existing tokens
  await prisma.passwordResetToken.deleteMany({
    where: { userId },
  })

  const tokenId = generateIdFromEntropySize(25) // 40 characters
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)))
  const expiresAt = createDate(new TimeSpan(2, 'h')) // Token expires in 2 hours

  await prisma.passwordResetToken.create({
    data: {
      token_hash: tokenHash,
      userId,
      expiresAt,
    },
  })

  return tokenId
}
export async function sendPasswordResetToken(email: string, verificationLink: string): Promise<void> {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  } as any) ;

  // Setup email data
  const mailOptions = {
    from: `<${smtpUser}>`, // Use runtime config for sender address
    to: email, // List of receivers
    subject: 'Password Reset', // Subject line
    text: `You requested a password reset. Click the link to reset your password: ${verificationLink}`, // Plain text body
    html: `<p>You requested a password reset. Click the link to reset your password: <a href="${verificationLink}">${verificationLink}</a></p>`, // HTML body
  }

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
      throw createError({
        message: 'Failed to send email',
        statusCode: 500,
      })
    }
    // eslint-disable-next-line no-console
    console.log(`Email sent: ${info.response}`)
  })
}
