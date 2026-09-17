import { fetchProductDetail, fetchProductSummaries, type FetchProductsOptions } from "./products"
import type {
  ApiProductDetail,
  ApiProductSummary,
  ApiVariant,
  VariantCard,
  VariantGroup,
} from "./types"

/**
 * ── Variant transformation ──────────────────────────────────────────────
 *
 * One backend PRODUCT can have many VARIANTS (colour × size). The
 * storefront renders one CARD per colour, e.g.
 *
 *   Pedro Bag - Black
 *   Pedro Bag - Green
 *   Pedro Bag - Red
 *
 * ...while still preserving the full colour × size × sku × stock
 * breakdown for the product detail page.
 *
 * IMAGE RULE (confirmed against the real contract): a variant carries at
 * most one image of its own. A Shop-grid card must show ONLY that
 * variant's own image — never the product's coverImage or its
 * "additional angle" images[]. Those belong on the product detail page
 * only, as secondary photos after the selected variant's own image. If a
 * variant has no image, the card shows an empty placeholder rather than
 * silently substituting unrelated product artwork.
 *
 * `color`/`size` are both null for a Material/custom-typed product
 * (variantType tells you which shape to expect) — there's nothing to
 * group by, so such variants collapse into a single generic card for
 * the whole product rather than being split incorrectly.
 */

function slugifyColour(colour: string) {
  return colour
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const NO_COLOUR_KEY = "__no-colour__"

/** Groups a flat variant list into one entry per distinct colour. */
export function groupVariantsByColour(variants: ApiVariant[]): VariantGroup[] {
  const groups = new Map<string, VariantGroup>()

  for (const variant of variants) {
    const key = variant.color ? slugifyColour(variant.color) : NO_COLOUR_KEY
    const existing = groups.get(key)

    if (existing) {
      existing.sizes.push({ size: variant.size, sku: variant.sku, inStock: variant.inStock })
      // Every size sharing a colour is expected to carry the same image;
      // fill in from whichever size variant happens to have one set.
      if (!existing.image && variant.image) existing.image = variant.image
    } else {
      groups.set(key, {
        colour: variant.color,
        colorSlug: key === NO_COLOUR_KEY ? undefined : key,
        image: variant.image ?? "",
        sizes: [{ size: variant.size, sku: variant.sku, inStock: variant.inStock }],
      })
    }
  }

  return Array.from(groups.values())
}

function toVariantCard(product: ApiProductSummary, group: VariantGroup | null): VariantCard {
  return {
    id: group?.colorSlug ? `${product.slug}--${group.colorSlug}` : product.slug,
    productSlug: product.slug,
    name: product.name,
    colour: group?.colour ?? null,
    colorSlug: group?.colorSlug,
    price: product.price,
    discount: product.discount ?? null,
    discountedPrice: product.discountedPrice ?? null,
    category: product.categories?.[0] ?? { slug: "", name: "" },
    // Variant image ONLY — never product.coverImage / product.images.
    image: group?.image ?? "",
    featuredFlags: product.featuredFlags ?? [],
  }
}

/**
 * The list endpoint's summary DTO (see PUBLIC_PRODUCT_SUMMARY_SELECT in
 * the admin repo) intentionally embeds only `{ id, currentStock }` per
 * variant — no colour, size, sku, or image. That's fine for computing
 * `inStock` server-side, but it means a summary's `variants[]` is never
 * enough on its own to render colour cards/images. Detect that "thin"
 * shape (rather than just "empty") so this never silently mistakes it
 * for "no variants" and renders a single colourless, imageless card.
 */
function hasUsableVariantData(variants: ApiVariant[] | undefined): variants is ApiVariant[] {
  return !!variants && variants.length > 0 && variants.every((v) => typeof v.sku === "string")
}

async function buildCardsForProduct(product: ApiProductSummary): Promise<VariantCard[]> {
  let variants = product.variants

  if (!hasUsableVariantData(variants)) {
    const detail = await fetchProductDetail(product.slug)
    variants = detail?.variants ?? []
  }

  if (!variants || variants.length === 0) {
    // No variant data at all — show the product as a single generic card
    // rather than losing it from the grid entirely. No product-cover
    // fallback is used for its image; see the header comment above.
    return [toVariantCard(product, null)]
  }

  const groups = groupVariantsByColour(variants)
  return groups.map((group) => toVariantCard(product, group))
}

/** Fetch every product for a category and expand it into per-colour cards. */
export async function getVariantCards(options: FetchProductsOptions = {}): Promise<VariantCard[]> {
  const summaries = await fetchProductSummaries(options)
  const cardLists = await Promise.all(summaries.map(buildCardsForProduct))
  return cardLists.flat()
}

/**
 * Full detail for a single product, including the preserved colour × size
 * variant breakdown, for the Product Details page.
 */
export async function getProductWithVariantGroups(slug: string): Promise<{
  product: ApiProductDetail
  groups: VariantGroup[]
} | null> {
  const product = await fetchProductDetail(slug)
  if (!product) return null

  const groups = groupVariantsByColour(product.variants ?? [])
  return { product, groups }
}
