export default defineEventHandler(async (_event) => {
  // get all categories
  const categories = await prisma.categories.findMany({
    select: {
      name: true,
    },
  })
  return Object.values(categories).map(category => category.name)
})
