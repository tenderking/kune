export interface Service {
  id?: string
  name: string
  description: string
  category: string
  tags: string[]
  webUrl: string
  whatsapp: string
  image_url: string
  address?: string
  featured?: boolean
  claimed?: boolean
}
