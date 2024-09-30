import { verify } from '@node-rs/argon2'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const formData = await readFormData(event)

  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') {
    throw createError({
      message: 'Invalid username or password',
      statusCode: 400,
    })
  }

  // eslint-disable-next-line no-console
  console.log('username', username)
  // eslint-disable-next-line no-console
  console.log('password', password)

  const existingUser = await prisma.user.findUnique({
    where: { username },
  })

  if (!existingUser) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    })
  }
  // eslint-disable-next-line no-console
  console.log('exists user')
  const passwordHash = existingUser.password_hash
  if (passwordHash === null) {
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    })
  }
  // eslint-disable-next-line no-console
  console.log('passhash')
  const validPassword = await verify(passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
  // eslint-disable-next-line no-console
  console.log('validPassword', validPassword)
  if (!validPassword) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
    // If usernames are public, you can outright tell the user that the username is invalid.
    throw createError({
      message: 'Incorrect username or password',
      statusCode: 400,
    })
  }

  const session = await lucia.createSession(existingUser.id, {})
  appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
})
