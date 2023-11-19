import type { PutItemCommandInput } from "@aws-sdk/client-dynamodb"
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import type { ServiceRaw } from "@/types/ServiceRaw"
import type { ServiceJson } from "@/types/ServiceJson"

const ddbClient = new DynamoDBClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
})
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
export const servicesTableName = process.env.SERVICES_TABLE_NAME




export function mapJson(jsonData: ServiceRaw): ServiceJson {
  const mappedJson: ServiceJson = {
    category: jsonData.Category.S.toLowerCase(),
    description: jsonData.Description.S,
  }

  if (jsonData.Address) {
    if ("M" in jsonData.Address) {
      const { City, Street } = jsonData.Address.M
      mappedJson.address = { city: City.S, street: Street?.S }
    }
  }

  if (jsonData.ServiceName && jsonData.ServiceName.S)
    mappedJson.serviceName = jsonData.ServiceName.S

  if (jsonData.Website && jsonData.Website.S)
    mappedJson.website = jsonData.Website.S

  if (jsonData.ImgUrl && jsonData.ImgUrl.S)
    mappedJson.imgUrl = jsonData.ImgUrl.S

  if (jsonData.Tags && jsonData.Tags.L)
    mappedJson.tags = jsonData.Tags.L.map((tag) => tag.S)

  if (jsonData.PK && jsonData.PK.S) mappedJson.PK = jsonData.PK.S

  if (jsonData.SK && jsonData.SK.S) mappedJson.SK = jsonData.SK.S

  return mappedJson
}

// export function transformData(services) {
//   return Object.keys(services).map((key) => {
//     const service = services[key]
//     let newService = {}
//     for (let field in service) {
//       if (service[field].hasOwnProperty("S")) {
//         newService[field] = service[field].S
//       } else if (service[field].hasOwnProperty("M")) {
//         newService[field] = service[field].M
//         for (let subField in service[field].M) {
//           if (service[field].M[subField].hasOwnProperty("S")) {
//             newService[field][subField] = service[field].M[subField].S
//           }
//         }
//       } else if (service[field].hasOwnProperty("L")) {
//         newService[field] = service[field].L.map((field) => field.S)
//       }
//     }
//     return newService
//   })
// }

export function transformData(services) {
  return Object.keys(services).map((key) => {
    const service = services[key]
    let newService = {}
    for (let field in service) {
      let lowerCaseField = field.toLowerCase()
      if (service[field].hasOwnProperty("S")) {
        newService[lowerCaseField] = service[field].S
      } else if (service[field].hasOwnProperty("M")) {
        // Handle the Address field
        if (field === "Address") {
          newService[lowerCaseField] =
            service[field].M.Street.S + ", " + service[field].M.City.S
        } else {
          newService[lowerCaseField] = service[field].M
        }
      } else if (service[field].hasOwnProperty("L")) {
        newService[lowerCaseField] = service[field].L.map((tag) => tag.S)
      }
    }
    newService.id = key
    newService.imgUrl = "" // Set imgUrl as an empty string
    return newService
  })
}


