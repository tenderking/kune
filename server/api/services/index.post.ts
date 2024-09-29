export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const category = await prisma.categories.upsert({
    where: { name: body.category },
    update: {},
    create: {
      name: body.category,
    },
  })

  const res = await prisma.services.create({
    data: {
      name: body.name,
      description: body.description,
      category: {
        connect: {
          name: category.name, // use the upserted category's id
        },
      },
      service_owner: {
        connect: {
          email: body.serviceowner,
        },
      },
      website_url: body.website,
      service_tags: {
        create: [
          {
            tags: {
              connectOrCreate: {
                where: {
                  name: body.tags[0],
                },
                create: {
                  name: body.tags[0],
                },
              },
            },
          },
        ],
      },
    },
  })

  return res
})
