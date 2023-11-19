import { ScanCommand } from "@aws-sdk/client-dynamodb"


const scanCommand = new ScanCommand({
    TableName: servicesTableName,
  })





// Usage:


export async function listServices() {
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
