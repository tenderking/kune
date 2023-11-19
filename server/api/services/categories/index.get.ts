import {  ScanCommand } from "@aws-sdk/client-dynamodb"

export async function getCategories() {
  if (!servicesTableName) throw new Error("SERVICES_TABLE_NAME is not defined.")
  const params = {
    TableName: servicesTableName,
    ProjectionExpression: "Category",
  }

  const command = new ScanCommand(params)
  const response = await ddbDocClient.send(command)
  const categoryList = transformData(response.Items).map((item) => item.category)
  // const categorySet = new Set({categoryList})
    return {
    response:  categoryList,
  }
}

export default defineEventHandler(async () => {
  return await getCategories()
})
