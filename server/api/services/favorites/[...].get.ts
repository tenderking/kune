export default defineEventHandler(async (event) => {
  const user =event.context.sessions?event.context.sessions.user.id: event.context.params?.user
  const service = event.context.params?.service
  if (!user) {
    throw new Error("User not found")
  }
  if (!service) {
    throw new Error("Service not found")
  }
  console.log("user:",user)
  console.log("service:",service)
  const favoriteService = await prisma.favorite_services.findUnique({
    where: {
      user_id_service_id: {
        user_id: user,
        service_id: service ,
      },
    },
  })
  if (!favoriteService) {
    throw new Error("Favorite service not found")
  }
  return favoriteService
})
