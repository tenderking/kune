import { getCategories } from '@/composables/dynamodb'

export default defineEventHandler(async () => {
  return await getCategories()
})
