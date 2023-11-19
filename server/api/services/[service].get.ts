import { GetItemCommand } from "@aws-sdk/client-dynamodb"

export async function getService(name: string) {
  if (!name) throw new Error("Service ID is required for this operation.")

  if (!servicesTableName) throw new Error("SERVICES_TABLE_NAME is not defined.")
const PK = `Service#${name}`
  const params = {
    TableName: servicesTableName,
    Key: {
      PK: { S: PK },
      SK: { S: "Service" },
    },
  }
  try {
    const command = new GetItemCommand(params)
    const response = await ddbDocClient.send(command)
    if (!response.Item) return undefined

    // const mappedItem = mapJson(result.Item as unknown as ServiceRaw)
    // return mappedItem
    return response.Item
  } catch (err) {
    console.error("Error", err)
  }
}
export default defineEventHandler(async (event) => {
  if (!event.context || !event.context.params)
    throw new Error("Params is required for this operation.")

  const name = event.context.params.service
  // eslint-disable-next-line no-console
  console.log("service", name)
  console.log("context", event.context)
  if (!name) throw new Error("Service Name is required for this operation.")

  // let serviceName = service.split('#')[1]
  // serviceName = serviceName.replace(/%20/g, ' ')
  return await getService(name)
})
