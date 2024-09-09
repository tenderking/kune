import { authOptions } from '../auth/[...]'
import { getServerToken } from '#auth'

export default defineEventHandler(async (event) => {
  /**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Creates a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               serviceowner:
 *                 type: string
 *               website:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The created service object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 serviceowner:
 *                   type: string
 *                 website:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */

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
