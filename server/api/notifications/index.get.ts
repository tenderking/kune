import { requireUser } from '../../utils/requireUser'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const items = await prisma.notification.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
    take: 50,
  })
  return items
})
