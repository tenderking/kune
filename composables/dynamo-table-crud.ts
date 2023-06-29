/* eslint-disable no-console */
import { DynamoDB } from '@aws-sdk/client-dynamodb'

// Create the DynamoDB service object
const ddb = new DynamoDB({ apiVersion: '22-01-2023', endpoint: 'http://localhost:8000', region: 'localhost' })

// Create a table
export function createDynamoDBTable(
  tableName: string,
  attributeDefinitions: any[],
  keySchema: any[],
  provisionedThroughput: any,
): Promise<any> {
  const params = {
    TableName: tableName,
    AttributeDefinitions: attributeDefinitions,
    KeySchema: keySchema,
    ProvisionedThroughput: provisionedThroughput,
  }

  return new Promise((resolve, reject) => {
    ddb.createTable(params, (err: any, data: any) => {
      if (err) {
        reject(err)
      }
      else {
        console.log('Success', data)
        resolve(data)
      }
    })
  })
}

// Update a table
export function updateDynamoDBItem(
  tableName: string,
  key: any,
  updateExpression: string,
  expressionAttributeValues: any,
): Promise<any> {
  const params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  }

  return new Promise((resolve, reject) => {
    ddb.updateItem(params, (err: any, data: any) => {
      if (err)
        reject(err)
      else
        resolve(data.Attributes)
    })
  })
}

// Delete a table
export function deleteDynamoDBTable(tableName: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    ddb.deleteTable({ TableName: tableName }, (err, data) => {
      if (err) {
        if (err.code === 'ResourceNotFoundException')
          console.log('Error: Table not found')
        else if (err.code === 'ResourceInUseException')
          console.log('Error: Table in use')

        reject(err)
      }
      else {
        console.log('Success', data)
        resolve(data)
      }
    })
  })
}

// Read a table item
export function readDynamoDBItem(tableName: string, key: any): Promise<any> {
  const params = {
    TableName: tableName,
    Key: key,
  }

  return new Promise((resolve, reject) => {
    ddb.getItem(params, (err: any, data: any) => {
      if (err)
        reject(err)
      else
        resolve(data.Item)
    })
  })
}
