export interface InputJson {
  Category: { S: string }
  Description: { S: string }
  Address: { M: { City: { S: string }; Street?: { S: string } } }
  ServiceName: { S: string }
  Website: { S: string }
  ImgUrl: { S: string }
  Tags: { L: { S: string }[] }
  ServiceID: { S: string }
}

interface OutputJson {
  category: string
  description: string
  address?: { city: string; street?: string }
  serviceName?: string
  website?: string
  imgUrl?: string
  tags?: string[]
  serviceID?: string
}

function mapJson(jsonData: InputJson): OutputJson {
  const mappedJson: OutputJson = {
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
