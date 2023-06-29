import DynamoDB from 'aws-sdk/clients/dynamodb'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createDynamoDBTable, deleteDynamoDBTable, readDynamoDBItem, updateDynamoDBItem } from './dynamo-table-crud'

const ddb = new DynamoDB({
  apiVersion: '22-01-2023',
  endpoint: 'http://localhost:8000',
  region: 'localhost',
})

describe('createDynamoDBTable', () => {
  const tableName = 'test-table'
  const attributeDefinitions = [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'name', AttributeType: 'S' },
  ]
  const keySchema = [
    { AttributeName: 'id', KeyType: 'HASH' },
    { AttributeName: 'name', KeyType: 'RANGE' },
  ]
  const provisionedThroughput = {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  }

  beforeAll(async () => {
    await createDynamoDBTable(
      tableName,
      attributeDefinitions,
      keySchema,
      provisionedThroughput,
    )
  })

  afterAll(async () => {
    await deleteDynamoDBTable(tableName)
  })

  it('should create a table', async () => {
    const result = await ddb.describeTable({ TableName: tableName }).promise()
    expect(result.Table?.TableName).toEqual(tableName)
  })
})

describe('deleteDynamoDBTable', () => {
  const tableName = 'test-table'

  beforeAll(async () => {
    await createDynamoDBTable(
      tableName,
      [{ AttributeName: 'id', AttributeType: 'S' }],
      [{ AttributeName: 'id', KeyType: 'HASH' }],
      { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    )
  })

  it('should delete a table', async () => {
    await deleteDynamoDBTable(tableName)
    try {
      await ddb.describeTable({ TableName: tableName }).promise()
    }
    catch (err) {
      expect(err.code).toEqual('ResourceNotFoundException')
    }
  })
})

describe('readDynamoDBItem', () => {
  const tableName = 'test-table'
  const item = { id: { S: '1' }, name: { S: 'test' } }
  const key = { id: { S: '1' }, name: { S: 'test' } }

  beforeAll(async () => {
    await ddb
      .createTable({
        TableName: tableName,
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'name', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'name', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
      .promise()
    await ddb.putItem({ TableName: tableName, Item: item }).promise()
  })

  afterAll(async () => {
    await ddb.deleteTable({ TableName: tableName }).promise()
  })

  it('should read an item from a table', async () => {
    const result = await readDynamoDBItem(tableName, key)
    expect(result).toEqual(item)
  })
})

describe('updateDynamoDBItem', () => {
  const tableName = 'test-table'
  const item = { id: { S: '1' }, name: { S: 'test' } }
  const key = { id: { S: '1' }, name: { S: 'test' } }
  const updateExpression = 'SET #name = :newName'
  const expressionAttributeValues = {
    ':newName': { S: 'newTest' },
  }

  beforeAll(async () => {
    await ddb
      .createTable({
        TableName: tableName,
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'name', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'name', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
      .promise()
    await ddb.putItem({ TableName: tableName, Item: item }).promise()
  })

  afterAll(async () => {
    await ddb.deleteTable({ TableName: tableName }).promise()
  })

  it('should update an item in a table', async () => {
    const result = await updateDynamoDBItem(
      tableName,
      key,
      updateExpression,
      expressionAttributeValues,
    )
    expect(result).toEqual({ name: { S: 'newTest' } })
  })
})
