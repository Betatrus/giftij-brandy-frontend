/**
 * The storefront only ever talks to the Giftij Brandy PUBLIC read-only
 * REST API exposed by the admin repository (giftij-brandy-admin). It never
 * touches a database, an ORM, or any admin-only route.
 *
 * giftij-brandy-admin (private, has the DB)
 *         │
 *         │  public read-only REST API
 *         ▼
 * giftij-brandy-frontend (this repo — public, no DB, no secrets)
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_GIFTIJ_API_BASE ?? "https://api.giftij.com/api/v1/public"

/** Fixed storefront categories, per the confirmed backend taxonomy. */
export const CATEGORIES = [
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "slippers", name: "Slippers" },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]["slug"]

/**
 * Homepage placement flags, as set by the Admin dashboard's "Homepage
 * Placement" configuration and returned in a product's `featuredFlags`.
 *
 * IMPORTANT: a product must never be shown in a placement section just
 * because it exists, belongs to a category, is newest, or is simply the
 * first result returned — only an explicit flag here qualifies it.
 */
export const HOMEPAGE_PLACEMENT = {
  bestSellers: "best_sellers",
  featuredCollection: "featured_collection",
} as const

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value)
}
