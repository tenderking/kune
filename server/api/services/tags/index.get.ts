export default defineEventHandler(async (_event) => {
  // get all tags
  const tags = await prisma.tags.findMany({
    select: {
      name: true,
    },
  })
  return Object.values(tags).map(tag => tag.name)
})
