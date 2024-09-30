import { hash } from '@node-rs/argon2'
import { Prisma, PrismaClient } from '@prisma/client'
import { generateId } from 'lucia'
import isValidEmail from '~/server/utils/auth'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const formData = await readFormData(event)

  const name = formData.get('name')
  if (typeof name !== 'string' || name.length < 1 || name.length > 255) {
    throw createError({
      message: 'Invalid name',
      statusCode: 400,
    })
  }
  const username = formData.get('username')
  if (
    typeof username !== 'string'
    || username.length < 3
    || username.length > 31
    || !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: 'Invalid username',
      statusCode: 400,
    })
  }
  const password = formData.get('password')
  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    throw createError({
      message: 'Invalid password',
      statusCode: 400,
    })
  }

  const email = formData.get('email')
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return new Response('Invalid email', {
      status: 400,
    })
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  const userId = generateId(15)

  try {
    // Create the user using Prisma
    const user = await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        password_hash: passwordHash,
        name,
      },
    })

    const session = await lucia.createSession(user.id, {})
    appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') { // Unique constraint violation
      throw createError({
        message: 'Username already used',
        statusCode: 400, // It's better to use 400 for client-side errors
      })
    }
    throw createError({
      message: 'An unknown error occurred',
      statusCode: 500,
    })
  }
})
