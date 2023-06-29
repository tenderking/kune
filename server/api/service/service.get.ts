import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

const ddb = new DynamoDB({ apiVersion: '22-01-2023', endpoint: 'http://localhost:8000', region: 'localhost' })
export const servicesTableName = process.env.SERVICES_TABLE_NAME

export async function getService(id: string) {
  const params = {
    TableName: servicesTableName,
    Key: {
      id,
    },
	}
	const command = new QueryCommand(params)
  const result = await ddb.getItem(params).promise()
  return result.Item
}
