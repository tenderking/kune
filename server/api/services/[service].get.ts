import {
  DynamoDBClient,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const ddbClient = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
export const servicesTableName = process.env.SERVICES_TABLE_NAME
export async function getService(id: string, serviceName: string) {
  if (!id)
    throw new Error('Service ID is required for this operation.')

  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')

  const params = {
    TableName: servicesTableName,
    Key: {
      ServiceID: { N: id },
      ServiceName: { S: serviceName },
    },
  }
  try {
    const command = new GetItemCommand(params)
    const result = await ddbDocClient.send(command)
    return result.Item
  }
  catch (err) {
    console.error('Error', err)
  }
}

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
