/**
 * Types for the Giftij Brandy public storefront API.
 *
 * The storefront has NO direct database access. Everything here models the
 * read-only REST contract exposed by the admin backend.
 */

export type CategorySlug = "bags" | "shoes" | "slippers"

export interface Category {
  slug: CategorySlug | string
  name: string
}

/**
 * Rich product-gallery image returned by the product-detail endpoint.
 */
export interface ApiProductImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
  format: string | null
  sortOrder: number
}

/**
 * A single purchasable colour/size combination.
 */
export interface ApiVariant {
  id: string
  sku: string
  color: string | null
  size: string | null
  value?: string
  inStock: boolean
  image: string | null
}

/**
 * Shape returned by the products list endpoint.
 *
 * List images are simple URL strings.
 */
export interface ApiProductSummary {
  slug: string
  name: string
  price: number
  discount?: number | null
  discountedPrice?: number | null
  categories: Category[]
  featuredFlags?: string[]
  coverImage?: string | null
  images?: string[]
  inStock?: boolean
  variantType?: string
  variants?: ApiVariant[]
}

/**
 * Shape returned by the single-product detail endpoint.
 *
 * Important:
 * - The backend field is `fullDesc`, not `description`.
 * - Detail `images` are rich image objects.
 */
export interface ApiProductDetail
  extends Omit<ApiProductSummary, "images" | "variants"> {
  fullDesc?: string
  description?: string
  images: ApiProductImage[]
  specs?: { label: string; value: string }[]
  variants: ApiVariant[]
}

/** One colour-group of variants belonging to the same parent product. */
export interface VariantGroup {
  colour: string | null
  colorSlug?: string
  image: string
  sizes: {
    size: string | null
    sku: string
    inStock: boolean
  }[]
}

/**
 * A single storefront Shop card.
 */
export interface VariantCard {
  id: string
  productSlug: string
  name: string
  colour: string | null
  colorSlug?: string
  price: number
  discount: number | null
  discountedPrice: number | null
  category: Category
  image: string
  featuredFlags: string[]
}