import { getService } from '@/composables/dynamodb'

export default defineEventHandler(async (event) => {
  if (!event.context || !event.context.params)
    throw new Error('Params is required for this operation.')

  const PK = event.context.params.service
  // eslint-disable-next-line no-console
  console.log('service', service)
  console.log('context', event.context)
  if (!service)
    throw new Error('Service Name is required for this operation.')
 
  // let serviceName = service.split('#')[1]
  // serviceName = serviceName.replace(/%20/g, ' ')
  return await getService(PK)
})
