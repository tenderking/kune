export interface ServiceJson {
  [x: string]: any
  category: string
  description: string
  address?: { city: string; street?: string }
  serviceName?: string
  website?: string
  imgUrl?: string
  tags?: string[]
  serviceID?: string
}
