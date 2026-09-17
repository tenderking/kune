export interface DealService {
  id: string
  name: string
  image_url: string
  category: string
  website_url?: string
  phone_number?: string
  address?: string
  featured?: boolean
}

export interface PublicDeal {
  id: string
  slug: string
  title: string
  description: string
  original_price: number
  deal_price: number
  currency: string
  quantity_total: number
  quantity_sold: number
  quantity_remaining: number
  min_buyers: number
  starts_at: string
  ends_at: string
  status: string
  live_status: string
  redemption_instructions: string
  terms: string
  discount_percent: number
  savings: number
  is_buyable: boolean
  has_tipped: boolean
  buyers_needed?: number
  is_redeemable?: boolean
  service: DealService
}

export interface VoucherRecord {
  id: string
  code: string
  status: string
  purchased_at: string | null
  redeemed_at: string | null
  deal: PublicDeal
}
