/**
 * Browser-safe Giftij API configuration.
 *
 * This API base is intentionally public because checkout initialization
 * and order-status polling are performed from the customer's browser.
 *
 * Do NOT put credentials, secrets, database URLs, Paystack secret keys,
 * or STOREFRONT_API_SECRET in this file.
 *
 * Protected product catalogue reads use:
 *
 *   lib/api/server-config.ts
 *
 * instead.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_GIFTIJ_API_BASE ??
  "https://api.giftijbrandy.com/api/v1/public"

/** Fixed storefront categories, per the confirmed backend taxonomy. */
export const CATEGORIES = [
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "slippers", name: "Slippers" },
] as const

export type CategorySlug =
  (typeof CATEGORIES)[number]["slug"]

/**
 * Homepage placement flags, as set by the Admin dashboard's
 * "Homepage Placement" configuration and returned in a
 * product's `featuredFlags`.
 *
 * A product must never be shown in a placement section just
 * because it exists, belongs to a category, is newest, or is
 * simply the first result returned.
 *
 * Only an explicit flag here qualifies it.
 */
export const HOMEPAGE_PLACEMENT = {
  bestSellers: "best_sellers",
  featuredCollection: "featured_collection",
} as const

export function isCategorySlug(
  value: string,
): value is CategorySlug {
  return CATEGORIES.some(
    (category) => category.slug === value,
  )
}