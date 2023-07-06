import type { PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBClient, PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const ddbClient = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
export const servicesTableName = process.env.SERVICES_TABLE_NAME

interface ServicePayload {
  Category: string
  Description: string
  Address: string
  ServiceName: string
  Website: string
  ImgUrl: string
  Tags: string[]
  ServiceID: number
}
export async function createServiceItem(body: ServicePayload) {
  if (!body.ServiceName)
    throw new Error('Service Name is required for this operation.')
  if (!body.ServiceID)
    throw new Error('Service ID is required for this operation.')
  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')
  if (body.Tags === undefined || body.Tags === null)
    throw new Error('Tags are required for this operation.')

  const params: PutItemCommandInput = {
    TableName: servicesTableName,
    Item: {
      ServiceID: { N: String(body.ServiceID) },
      ServiceName: { S: body.ServiceName },
      Address: { S: body.Address },
      Category: { S: body.Category },
      Description: { S: body.Description },
      ImgUrl: { S: body.ImgUrl },
      Tags: { L: body.Tags.map(tag => ({ S: tag })) },
      Website: { S: body.Website },
    },
    ReturnConsumedCapacity: 'TOTAL',
  }

  try {
    const command = new PutItemCommand(params)
    await ddbDocClient.send(command)
  }
  catch (err) {
    console.error('Error', err)
  }
}
export default defineEventHandler(async (event) => {
  const body: ServicePayload = await readBody(event)
  await createServiceItem(body)
})
