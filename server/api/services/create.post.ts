// import { createServiceItem } from '@/composables/dynamodb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await createServiceItem(body)
})
