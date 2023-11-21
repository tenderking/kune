// import { createServiceItem } from '@/composables/dynamodb'
export async function createServiceItem(body: ServiceJson) {
  if (body === undefined || body === null)
    throw new Error('Body is required for this operation.')
  if (!body.serviceName)
    throw new Error('Service Name is required for this operation.')
  if (!servicesTableName)
    throw new Error('SERVICES_TABLE_NAME is not defined.')
  if (body.tags === undefined || body.tags === null)
    throw new Error('Tags are required for this operation.')
  if (body.address === undefined || body.address === null)
    throw new Error('Address is required for this operation.')
  if (!body.website)
    throw new Error('Website is required for this operation.')
  // if (!body.imgUrl)
  //   throw new Error('Image URL is required for this operation.')

  const params: PutItemCommandInput = {
    TableName: servicesTableName,
    Item: {
      PK: { S: `Service#${body.ServiceName}` },
      ServiceName: { S: body.ServiceName },
      Address: { M: { city: { S: body.Address.City } } },
      Category: { S: body.Category },
      Description: { S: body.Description },
      // ImgUrl: { S: body.imgUrl },
      Tags: { L: body.Tags.map((tag: string) => ({ S: tag })) },
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
  const body = await readBody(event)
  await createServiceItem(body)
})
