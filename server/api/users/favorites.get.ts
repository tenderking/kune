export default defineEventHandler(async (event) => {
  // get favorites by user
  const favorites = await prisma.favorite_Services.findMany({
    where: {
      user_id: "cluen2o0d000011yn1tfbcozg",
    },
    select: {
      favorited_service: true,
    },
  })

  const transformedFavorites = favorites.map((favorite) => ({
    favorited_service: favorite.favorited_service,
  }))

  return transformedFavorites
})
