import { ScanCommand } from "@aws-sdk/client-dynamodb"




export async function listServices() {
  const scanCommand = new ScanCommand({
    TableName: servicesTableName,
  })
  if (!servicesTableName) throw new Error("SERVICES_TABLE_NAME is not defined.")
  const response = await ddbDocClient.send(scanCommand)
  if (!response.Items) throw new Error("No items found.")
   const items =  response.Items
  return {
     services: transformData(items),
    // response, // Assuming Service is the interface representing your desired output structure
  }
}
export default defineEventHandler(async () => {
  return await listServices()
})
