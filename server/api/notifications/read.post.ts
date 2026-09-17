import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const id = String(body?.id || '').trim()
  if (id) {
    await prisma.notification.updateMany({
      where: { id, user_id: user.id },
      data: { read: true },
    })
  }
  else {
    await prisma.notification.updateMany({
      where: { user_id: user.id, read: false },
      data: { read: true },
    })
  }
  return { ok: true }
})
