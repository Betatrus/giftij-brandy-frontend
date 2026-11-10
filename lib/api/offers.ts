import "server-only"
import { SERVER_API_BASE, getStorefrontApiSecret } from "@/lib/api/server-config"

export interface PublicOfferProduct {
  slug: string
  name: string
  basePrice: number
  offerPrice: number
  discountPercent: number | null
  freeDelivery: boolean
  giftDescription: string | null
  image: string | null
  imageAlt: string
}

export interface PublicOfferCampaign {
  campaign: {
    title: string
    slug: string
    description: string | null
    announcementHtml: string | null
    creativeImageUrl: string | null
    ctaText: string
    startsAt: string | null
    endsAt: string | null
    maxQualifyingOrders: number | null
    qualifyingOrdersCount: number
  }
  offerSets: { id: string; title: string; description: string | null }[]
  offerSet: { id: string; title: string; description: string | null }
  products: PublicOfferProduct[]
}

export async function fetchOfferCampaign(slug: string, offerSetId?: string): Promise<PublicOfferCampaign | null> {
  try {
    const response = await fetch(
      `${SERVER_API_BASE}/offers/${encodeURIComponent(slug)}${offerSetId ? `?set=${encodeURIComponent(offerSetId)}` : ""}`,
      { headers: { "X-Storefront-Key": getStorefrontApiSecret() }, cache: "no-store" },
    )
    if (!response.ok) return null
    const json = await response.json()
    return json?.success && json.data ? json.data as PublicOfferCampaign : null
  } catch (error) {
    console.error("[giftij] failed to load offer campaign", error)
    return null
  }
}
