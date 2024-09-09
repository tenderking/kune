import { subtle } from 'uncrypto'
import { hash } from 'ohash'
import { authOptions } from '../api/auth/[...]'
import { getServerSession } from '#auth'

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

export async function protectedRoute(event: any) {
  try {
    const session = await getServerSession(event, authOptions)
    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }
    return session.user.email as string
  }
  catch (error: any) {
    console.error(error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    })
  }
}

export function handleError(errorMessage: string): void {
  // Add your error handling logic her
  throw createError({
    statusCode: 401,
    message: errorMessage,
  })
}
