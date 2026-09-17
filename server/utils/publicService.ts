export function mapPublicService(service: {
  id: string
  name: string
  description: string
  image_url: string
  website_url: string
  phone_number: string
  address?: string
  featured?: boolean
  service_owner_id?: string | null
  category: { name: string } | string
  service_tags: { tags: { name: string } }[]
}) {
  const category = typeof service.category === 'string' ? service.category : service.category.name
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    address: service.address || '',
    category,
    tags: service.service_tags.map(tag => tag.tags.name),
    webUrl: service.website_url,
    website_url: service.website_url,
    whatsapp: service.phone_number,
    image_url: service.image_url,
    featured: Boolean(service.featured),
    claimed: Boolean(service.service_owner_id),
  }
}

export const publicServiceSelect = {
  id: true,
  name: true,
  description: true,
  address: true,
  image_url: true,
  website_url: true,
  phone_number: true,
  featured: true,
  service_owner_id: true,
  category: {
    select: { name: true },
  },
  service_tags: {
    select: {
      tags: {
        select: { name: true },
      },
    },
  },
} as const
