import { fileURLToPath } from 'node:url'

// snippet-start:[dynamodb.JavaScript.docClient.queryV3]
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

export async function main() {
  const command = new QueryCommand({
    TableName: 'Services',
    KeyConditionExpression:
'OriginCountry = :originCountry AND RoastDate > :roastDate',
    ExpressionAttributeValues: {
      ':originCountry': 'Ethiopia',
      ':roastDate': '2023-05-01',
    },
    ConsistentRead: true,
  })

  const response = await docClient.send(command)

  return response
}
// snippet-end:[dynamodb.JavaScript.docClient.queryV3]

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url))
  main()