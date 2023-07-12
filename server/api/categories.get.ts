import { listServices } from '@/composables/dynamodb'

export default defineEventHandler(async () => {
  return await listServices()
})
