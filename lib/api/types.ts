/**
 * Types for the Giftij Brandy public storefront API.
 *
 * The storefront has NO direct database access. Everything here models the
 * read-only REST contract exposed by the admin backend
 * (giftij-brandy-admin), which remains the single source of truth for
 * product/business data.
 *
 * Confirmed 2026-09 directly against the admin repo's actual code (not the
 * docs — docs/API_CONTRACT.md is known stale for the variants shape):
 *   - GET /products/{slug} variants[] carries id, sku, color, size, value,
 *     inStock, image (see ApiVariant below).
 *   - GET /categories exists (flat via ?flat=true).
 *   - featuredFlags values are drawn from a fixed set including
 *     "best_sellers" (see HOMEPAGE_PLACEMENT in ./config.ts).
 *   - `?category=` on the products list DOES filter server-side
 *     (`where.categories = { some: { slug } }`), but admin's own read of
 *     the code flags a suspected unstable_cache key-collision bug as the
 *     likely cause of the wrong-category results we saw. Until that's
 *     confirmed fixed, this storefront deliberately fetches unfiltered
 *     and filters client-side (see lib/api/products.ts).
 */

export type CategorySlug = "bags" | "shoes" | "slippers"

export interface Category {
  slug: CategorySlug | string
  name: string
}

/**
 * A single purchasable colour/size combination for a product.
 *
 * `color` and `size` are both `null` for a Material/custom-typed product
 * (see `variantType` on the product) — there is no colour to group by for
 * those, so the adapter falls back to treating the whole product as one
 * card rather than trying to split it.
 *
 * `image` is a SINGLE url (or null), not an array — a variant has at most
 * one image, enforced at the database level. Every size that shares a
 * colour is expected to carry the same image; the storefront does not
 * assume a size-specific image exists.
 *
 * There is no per-variant price — price/discount are product-level only.
 * There is no raw inventory count exposed; `inStock` is the only signal,
 * already derived server-side from `currentStock > 0`.
 */
export interface ApiVariant {
  id: string
  sku: string
  color: string | null
  size: string | null
  /** Display string e.g. "Yellow / 16", kept for back-compat — not authoritative. */
  value?: string
  inStock: boolean
  image: string | null
}

/** Shape returned by the products *list* endpoint. */
export interface ApiProductSummary {
  slug: string
  name: string
  price: number
  discount?: number | null
  /**
   * The real charged price after discount — authoritative, computed
   * server-side. Confirmed by the backend team to exist in the actual
   * DTO (it was simply undocumented until now). Prefer this over
   * recomputing from `price`/`discount` client-side wherever it's
   * present, since the backend's rounding/business rules are the
   * source of truth, not ours.
   */
  discountedPrice?: number | null
  /**
   * Comes back as an array (`categories: [{ name, slug }]`), not a
   * singular `category` object. A product can carry more than one
   * category; the storefront treats the first entry as primary.
   */
  categories: Category[]
  featuredFlags?: string[]
  /**
   * Product-level cover/gallery imagery — "extra angle" shots. These
   * belong on the product detail page ONLY, as secondary images after
   * the selected variant's own image. They must never be used as a
   * Shop-grid card's primary image; a card always shows that specific
   * colour variant's own photo, or nothing.
   */
  coverImage?: string
  images?: string[]
  inStock?: boolean
  variantType?: string
  /**
   * Some list-endpoint responses may already embed variant data. When
   * they do, the adapter uses it directly and avoids an extra request
   * per product. When they don't, it falls back to the detail endpoint.
   */
  variants?: ApiVariant[]
}

/** Shape returned by the single-product *detail* endpoint. */
export interface ApiProductDetail extends ApiProductSummary {
  description?: string
  specs?: { label: string; value: string }[]
  variants: ApiVariant[]
}

/** One colour-group of variants belonging to the same parent product. */
export interface VariantGroup {
  colour: string | null
  colorSlug?: string
  /** This colour's own photo — the ONLY image a Shop-grid card may show. */
  image: string
  sizes: {
    size: string | null
    sku: string
    inStock: boolean
  }[]
}

/**
 * A single storefront "card" — this is the unit the Shop grid renders.
 * One backend product with 3 colours produces 3 of these.
 */
export interface VariantCard {
  id: string
  productSlug: string
  name: string
  colour: string | null
  colorSlug?: string
  price: number
  discount: number | null
  /** Authoritative real charged price from the API — see ApiProductSummary. */
  discountedPrice: number | null
  category: Category
  /** This card's own variant image — never the product cover/gallery image. */
  image: string
  featuredFlags: string[]
}
