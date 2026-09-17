import { requireUser } from '../../utils/requireUser'
import isValidEmail from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim().toLowerCase()

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required.' })
  }
  if (!email || !isValidEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email is required.' })
  }

  if (email !== (user.email || '').toLowerCase()) {
    const taken = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: user.id },
      },
    })
    if (taken) {
      throw createError({ statusCode: 409, statusMessage: 'That email is already in use.' })
    }
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name, email },
    select: { id: true, name: true, email: true, username: true, role: true },
  })

  return updated
})
