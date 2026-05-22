import { randomBytes, createHash } from 'node:crypto'
import nodemailer from 'nodemailer'
import { hash } from 'ohash'
import { subtle } from 'uncrypto'

export function generateRandomString(length: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const bytes = randomBytes(length)
  for (let i = 0; i < length; i++) {
    result += alphabet[bytes[i] % alphabet.length]
  }
  return result
}

export default function replaceSpaceSymbol(str: string) {
  return str.replace(/%20/g, ' ')
}

export function saltAndHashPassword(password: string): string {
  const salt = subtle
  const saltedPassword = salt + password
  return hash(saltedPassword)
}

export async function createUser(email: string, password: string) {
  const hashedPassword = saltAndHashPassword(password)

  // Create user in the database
  const user = await prisma.user.create({
    data: {
      email: email as string,
      password_hash: hashedPassword,
    },
  })

  return user
}

export async function getUserFromDB(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}

export async function isVerifiedEmail(email: string) {
  const verifiedEmail = await prisma.user.findUnique({
    where: { email },
  })
  /* current time - 10 mins */
  const validationWindow = new Date().getTime() - 600000
  if (verifiedEmail?.emailVerified && verifiedEmail.emailVerified < new Date(validationWindow) /* current time - 10 mins */) {
    return true
  }
}

export function handleError(errorMessage: string): void {
  // Add your error handling logic her
  throw createError({
    statusCode: 401,
    message: errorMessage,
  })
}

export async function createEmailVerificationLink(
  userId: string,
  email: string,
): Promise<string> {
  try {
    await prisma.emailVerificationToken.deleteMany({
      where: {
        userId,
      },
    })

    const token = generateRandomString(40) // 40 characters long
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2) // Expires in 2 hours

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

    return verificationLink
  }
  catch (error) {
    console.error('Error in createEmailVerificationLink:', error)
    throw error
  }
}

export async function sendVerificationEmail(
  username: string,
  email: string,
  verificationLink: string,
) {
  const config = useRuntimeConfig()
  const smtpHost = config.nodemailer.host
  const smtpPort = config.nodemailer.port
  const smtpUser = config.nodemailer.from
  const smtpPass = config.nodemailer.password

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  } as any)

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

const config = useRuntimeConfig()
const smtpHost = config.nodemailer.host
const smtpPort = config.nodemailer.port
const smtpUser = config.nodemailer.from
const smtpPass = config.nodemailer.password

export async function createPasswordResetToken(userId: string): Promise<string> {
  // Invalidate all existing tokens
  await prisma.passwordResetToken.deleteMany({
    where: { userId },
  })

  const tokenId = generateRandomString(40) // 40 characters
  const tokenHash = createHash('sha256').update(tokenId).digest('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2) // Token expires in 2 hours

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
      pass: smtpPass,
    },
  } as any)

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
