import type { PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import mapJson from './mapped-json'
import type { InputJson } from './mapped-json'

const ddbClient = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
export const servicesTableName = process.env.SERVICES_TABLE_NAME
interface Service {
  Category: {
    S: string
  }
  Description: {
    S: string
  }
  Address: {
    M: {
      City: {
        S: string
      }
    }
  }
  ServiceName: {
    S: string
  }
  Website: {
    S: string
  }
  DateAdded: {
    S: string
  }
  ImgUrl: {
    S: string
  }
  Tags: {
    L: {
      S: string
    }[]
  }
  ServiceID: {
    S: string
  }
}

interface ServicePayload {
  Category: string
  Description: string
  Address?: {
    City: string
    Street?: string
  }
  ServiceName: string
  Website: string
  ImgUrl?: string
  Tags: string[]
  ServiceID: number
}

/* Get all services */
export async function listServices() {
  const command = new ScanCommand({
    TableName: servicesTableName,
  })
  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')
  const response = await ddbDocClient.send(command)
  if (!response.Items)
    throw new Error('No items found.')
  const mappedItems = response.Items.map(item =>
    mapJson(item as unknown as InputJson),
  ) // Map the response items using the mapping function

  return {
    services: mappedItems as unknown as Service[], // Assuming Service is the interface representing your desired output structure
  }
}
/* Get all services by category */
export async function getItemsByCategories(category: string) {
  const params = {
    TableName: servicesTableName,
    IndexName: 'Category-index',
    KeyConditionExpression: 'Category = :categoryValue',
    ExpressionAttributeValues: {
      ':categoryValue': { S: category },
    },
  }

  const command = new QueryCommand(params)
  const response = await ddbDocClient.send(command)
  return {
    services: response.Items,
  }
}

/* Get all categories */
export async function getCategories() {
  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')
  const params = {
    TableName: servicesTableName,
    ProjectionExpression: 'Category',
  }

  const command = new ScanCommand(params)
  const response = await ddbDocClient.send(command)
  return {
    response: response.Items?.map(item => item.Category.S),
  }
}

/* Add a new service */
export async function createServiceItem(body: ServicePayload) {
  if (body === undefined || body === null)
    throw new Error('Body is required for this operation.')
  if (!body.ServiceName)
    throw new Error('Service Name is required for this operation.')
  if (!body.ServiceID)
    throw new Error('Service ID is required for this operation.')
  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')
  if (body.Tags === undefined || body.Tags === null)
    throw new Error('Tags are required for this operation.')

  if (body.Address === undefined || body.Address === null)
    throw new Error('Address is required for this operation.')

  const params: PutItemCommandInput = {
    TableName: servicesTableName,
    Item: {
      ServiceID: { N: String(body.ServiceID) },
      ServiceName: { S: body.ServiceName },
      Address: { M: { city: { S: body.Address.City } } },
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
/* Get a service by ID and Service Name */
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
/* Delete a service by ID and Service Name */
export async function deleteServiceItem(id: string, serviceName: string) {
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
    const command = new DeleteItemCommand(params)
    await ddbDocClient.send(command)
  }
  catch (err) {
    console.error('Error', err)
    // throw new Error('Service Name is required for this operation.')
  }

  // return {
  //   Response: "Success",
  // };
}
/* Get all services by tag */
/* Get all tags */
