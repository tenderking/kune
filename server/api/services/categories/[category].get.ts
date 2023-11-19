import { QueryCommand } from "@aws-sdk/client-dynamodb"

export async function getItemsByCategories(category: string) {
  const params = {
    TableName: servicesTableName,
    IndexName: "Category-index",
    KeyConditionExpression: "Category = :categoryValue",
    ExpressionAttributeValues: {
      ":categoryValue": { S: category },
    },
  }

  const command = new QueryCommand(params)
  const response = await ddbDocClient.send(command)
  if (!response.Items) throw new Error("No items found.")
  // const mappedItems = response.Items.map((item) =>
  //   mapJson(item as unknown as ServiceRaw)
  // ) // Map the response items using the mapping function

  return {
    // services: mappedItems as unknown as ServiceJson[], // Assuming Service is the interface representing your desired output structure
    services: transformData(response.Items),
  }
}
export default defineEventHandler(async (event) => {
  if (!event.context || !event.context.params)
    throw new Error('Params is required for this operation.')

  const category = event.context.params.category.replace(/%20/g, ' ')

  if (!category)
    throw new Error('Category is required for this operation.')
  return await getItemsByCategories(category)
})
