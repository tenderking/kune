import { PrismaClient } from '@prisma/client'
import { generateIdFromEntropySize } from 'lucia'
import { createDate, TimeSpan } from 'oslo'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

async function createEmailVerificationLink(
  userId: string,
  email: string,
): Promise<string> {
  // optionally invalidate all existing tokens
try {  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  })

  const token = generateIdFromEntropySize(25) // 40 characters long
  const expiresAt = createDate(new TimeSpan(2, 'h')) // Expires in 2 hours

  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId,
      email,
      expiresAt, // Expires in 2 hours
    },
  })

  const config = useRuntimeConfig()
  const origin = config.origin
  const verificationLink = `${origin}/auth/email-verification/${token}`

  return verificationLink}
   catch (error) {
    console.error("Error in createEmailVerificationLink:", error);
    throw error; // Re-throw to be caught by the main handler
  }
}

async function sendVerificationEmail(
  username: string,
  email: string,
  verificationLink: string,
) {
  const config = useRuntimeConfig()
  const smtpHost = config.nodemailer.host
  const smtpPort = config.nodemailer.port
  const smtpUser = config.nodemailer.from
  const smtpPass = config.nodemailer.password

  // const companyName = config.companyName
  // const companySupportEmail = config.companySupportEmail

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  } as any) ;

  const mailOptions = {
    // from: `"${companyName}" <${smtpUser}>`,
    from: smtpUser,
    to: email,
    subject: 'Email Verification',
    html: `
      <p>Hi ${username},</p>
      <p>Please verify your email by clicking on the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,</p>
      <p>Support: companySupportEmail </p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log("Request Body:", body)

    const { email, userId, username } = body
    console.log("Email:", email, "UserId:", userId, "Username:", username)

    const verificationLink = await createEmailVerificationLink(
      userId,
      email,
    )
    console.log("Verification Link:", verificationLink)

    await sendVerificationEmail(username, email, verificationLink)
    console.log("Email sent (theoretically).")

    return {
      ok: true,
    }
  } catch (error) {
    console.error("An error occurred in the main handler:", error)
    // You can customize the error response based on the error type if needed
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})