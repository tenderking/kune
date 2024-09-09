import { authOptions } from '../../auth/[...]'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getServerSession(event, authOptions)
  if (!session || !session.user || !session.user.email) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const user = await getUserFromDB(session.user.email)
  // eslint-disable-next-line no-console
  console.log('user', user)

  const res = await prisma.favorite_Services.delete({
    where: {
      user_id_service_id: {
        user_id: user?.id || '',
        service_id: body.service,
      },
    },
  })

  return res
})
