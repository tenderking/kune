import type { ServiceRaw } from 'types/ServiceRaw'
import type { ServiceJson } from 'types/ServiceJson'

function mapJson(jsonData: ServiceRaw): ServiceJson {
  const mappedJson: ServiceJson = {
    category: jsonData.Category.S.toLowerCase(),
    description: jsonData.Description.S,
  }

  if (jsonData.Address) {
    if ('M' in jsonData.Address) {
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
    mappedJson.tags = jsonData.Tags.L.map(tag => tag.S)

  if (jsonData.ServiceID && jsonData.ServiceID.S)
    mappedJson.serviceID = jsonData.ServiceID.S

  return mappedJson
}

export default mapJson