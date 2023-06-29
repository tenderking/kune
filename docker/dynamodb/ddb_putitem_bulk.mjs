import pkg from 'aws-sdk'

const { config, DynamoDB } = pkg

config.update({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})

const dynamodb = new DynamoDB()

const params = {
  TableName: 'Services',
}

dynamodb.scan(params, (err, data) => {
  if (err)
    console.error('Error', err)
})
