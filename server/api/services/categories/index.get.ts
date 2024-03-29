export default defineEventHandler(async (event) => {
  // get all categories
  const categories = await prisma.categories.findMany({
    select: {
      name: true,
    },
  })
  return Object.values(categories).map((category) => category.name)
})
