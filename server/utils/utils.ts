import { hash } from 'ohash'
import { subtle } from 'uncrypto'

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
      password: hashedPassword,
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
