import "server-only"
import { cache } from "react"
import { SERVER_API_BASE, getStorefrontApiSecret } from "@/lib/api/server-config"

export interface PublicOfferProduct {
  slug: string
  name: string
  offerSetId: string
  basePrice: number
  offerPrice: number
  discountPercent: number | null
  discountAmount: number | null
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
    defaultOfferSetId: string
  }
  offerSets: { id: string; title: string; description: string | null }[]
  offerSet: { id: string; title: string; description: string | null }
  products: PublicOfferProduct[]
}

export interface PublicExpiredOfferCampaign {
  expired: true
  campaign: {
    title: string
    slug: string
    description: string | null
    endsAt: string | null
    maxQualifyingOrders: number | null
  }
}

export type PublicOfferCampaignResult = PublicOfferCampaign | PublicExpiredOfferCampaign

export const fetchOfferCampaign = cache(async (slug: string, offerSetId?: string): Promise<PublicOfferCampaignResult | null> => {
  try {
    const response = await fetch(
      `${SERVER_API_BASE}/offers/${encodeURIComponent(slug)}${offerSetId ? `?set=${encodeURIComponent(offerSetId)}` : ""}`,
      { headers: { "X-Storefront-Key": getStorefrontApiSecret() }, cache: "no-store" },
    )
    if (!response.ok) return null
    const json = await response.json()
    return json?.success && json.data ? json.data as PublicOfferCampaignResult : null
  } catch (error) {
    console.error("[giftij] failed to load offer campaign", error)
    return null
  }
})


export interface PublicActiveOfferAnnouncement {
  id: string
  title: string
  slug: string
  description: string | null
  announcementHtml: string | null
  creativeImageUrl: string | null
  ctaText: string
  startsAt: string | null
  endsAt: string | null
  url: string
}

export async function fetchActiveOfferAnnouncement(): Promise<PublicActiveOfferAnnouncement | null> {
  try {
    const response = await fetch(
      `${SERVER_API_BASE}/offers/active`,
      {
        headers: { "X-Storefront-Key": getStorefrontApiSecret() },
        cache: "no-store",
      },
    )
    if (!response.ok) return null
    const json = await response.json()
    return json?.success && json.data
      ? json.data as PublicActiveOfferAnnouncement
      : null
  } catch (error) {
    console.error("[giftij] failed to load active offer announcement", error)
    return null
  }
}


export interface PublicOfferDirectoryCampaign {
  id: string
  title: string
  slug: string
  description: string | null
  creativeImageUrl: string | null
  ctaText: string
  startsAt: string | null
  endsAt: string | null
  url: string
  products: PublicOfferProduct[]
}

export async function fetchActiveOfferCampaigns(): Promise<PublicOfferDirectoryCampaign[]> {
  try {
    const response = await fetch(`${SERVER_API_BASE}/offers`, {
      headers: { "X-Storefront-Key": getStorefrontApiSecret() },
      cache: "no-store",
    })
    if (!response.ok) return []
    const json = await response.json()
    return json?.success && Array.isArray(json.data)
      ? json.data as PublicOfferDirectoryCampaign[]
      : []
  } catch (error) {
    console.error("[giftij] failed to load offer directory", error)
    return []
  }
}
