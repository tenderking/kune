import { getService } from '@/composables/dynamodb'

export default defineEventHandler(async (event) => {
  if (!event.context || !event.context.params)
    throw new Error('Params is required for this operation.')

  const service = event.context.params.service

  if (!service)
    throw new Error('Service Name is required for this operation.')
  const id = service.split('&')[0]
  let serviceName = service.split('&')[1]
  serviceName = serviceName.replace(/%20/g, ' ')
  return await getService(id, serviceName)
})
