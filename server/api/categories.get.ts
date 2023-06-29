import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const ddbClient = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
export const servicesTableName = process.env.SERVICES_TABLE_NAME

interface Service {
  Category: { S: string }
  Description: { S: string }
  Address: { S: string }
  ServiceName: { S: string }
  Website: { S: string }
  ImgUrl: { S: string }
  Tags: { L: { S: string }[] }
  ServiceID: { N: string }
}

async function getCategories() {
  const command = new ScanCommand({
    TableName: servicesTableName,
  })
  const response = await ddbDocClient.send(command)
  const services = response.Items as Service[]

  return {
    categories: services,
  }
}

export default defineEventHandler(async () => {
  return await getCategories()
})
