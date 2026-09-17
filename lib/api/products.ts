import { API_BASE } from "./config"
import type { ApiProductDetail, ApiProductSummary, Category } from "./types"

/**
 * Thin, typed wrappers around the Giftij public REST API. Every function
 * here is a plain `fetch` against `API_BASE` — no database access, no
 * secrets, nothing beyond what any browser could call directly.
 */

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    // Product data changes when the admin updates it; a short revalidate
    // window keeps the storefront reasonably fresh without hammering the
    // backend on every request.
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Giftij API request failed (${res.status}): ${url}`)
  }

  return res.json() as Promise<T>
}

export interface FetchProductsOptions {
  category?: string
  pageSize?: number
  sort?: string
}

/**
 * Verified 2026-09 against the actual `unstable_cache` implementation
 * shipped in this project's `next` version (15.5.22): the cache key is
 * `` `${fixedKey}-${JSON.stringify(args)}` `` — the query object IS part
 * of the key, so two different `category`/`page`/etc. values do NOT
 * collide. The "cache-key collision" theory earlier attributed to the
 * backend does not hold up against the actual source; it's left
 * un-"fixed" here deliberately rather than speculatively touching a
 * cache key that already works. Server-side `?category=` filtering is
 * therefore trusted below.
 *
 * CONFIRMED SEPARATE BUG (this file, now fixed): the actual `fetch()`
 * call below built its URL as `${API_BASE}/products` with NO query
 * string at all — `category`, `sort`, and `pageSize` were destructured
 * from `options` and then explicitly discarded (`void pageSize; void
 * sort`). That silently capped the storefront to the backend's default
 * page (page 1, pageSize 20, sort "newest") on EVERY request,
 * regardless of category or how many products actually exist. For any
 * catalogue over 20 products, or where a category's products aren't
 * all among the 20 newest overall, this made products/whole categories
 * vanish from the Shop page — most likely the real explanation for
 * earlier "missing Bags product" reports, not the cache. Fixed by
 * actually sending the query params and paginating through every page
 * the backend reports via `meta.pageCount` (capped defensively) so the
 * full catalogue — not just its first 20 items — reaches the storefront.
 */
export async function fetchProductSummaries(
  options: FetchProductsOptions = {},
): Promise<ApiProductSummary[]> {
  const { category, sort = "newest" } = options
  const perPage = 50 // backend's own max (see productListQuerySchema)
  const MAX_PAGES = 20 // safety cap — 1000 products is far beyond this MVP catalogue

  const all: ApiProductSummary[] = []

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const params = new URLSearchParams({ sort, page: String(page), pageSize: String(perPage) })
      if (category) params.set("category", category)

      const data = await getJson<ApiListEnvelope<ApiProductSummary> & { meta?: { pageCount?: number } }>(
        `${API_BASE}/products?${params.toString()}`,
      )
      const items = unwrapList(data)
      all.push(...items)

      const pageCount = !Array.isArray(data) ? data.meta?.pageCount : undefined
      if (!pageCount || page >= pageCount || items.length === 0) break
    }

    // Server-side filtering is trusted (see note above) but this stays
    // as a harmless, idempotent safety net for any slug/name mismatch —
    // filtering already-correct data changes nothing.
    return category ? filterSummariesByCategory(all, category) : all
  } catch (error) {
    console.error("[giftij] failed to load product summaries", error)
    return []
  }
}

/**
 * Verified 2026-09 against the live giftij-brandy-admin deployment: the
 * list endpoint returns `{ success, data: [...], meta }`, and product
 * category info comes back as a `categories` array, not a singular
 * `category` object. This helper accepts a couple of reasonable envelope
 * shapes defensively so a future contract tweak doesn't silently break
 * the storefront into rendering zero products again.
 */
type ApiListEnvelope<T> = { success?: boolean; data?: T[]; items?: T[] } | T[]

function unwrapList<T>(payload: ApiListEnvelope<T>): T[] {
  if (Array.isArray(payload)) return payload
  return payload.data ?? payload.items ?? []
}

/**
 * Category matching.
 *
 * CONFIRMED BUG (real data, 2026-09): a product's category came back as
 * `{ name: "Bag", slug: "bag" }` — singular — while the storefront's
 * category routes use the plural slugs ("bags", "shoes", "slippers") per
 * the confirmed taxonomy. An exact-match comparison of "bags" against
 * "bag" silently excluded a real, published product from its own
 * category page. This is fixed by canonicalising both sides to a
 * singular form before comparing, so "bag"/"bags" (and "shoe"/"shoes",
 * "slipper"/"slippers") are always treated as equivalent regardless of
 * which form the backend happens to store.
 *
 * Also:
 *   - matches on slug OR display name ("shoes" vs "Shoes")
 *   - tolerates a singular `category` object as well as `categories[]`
 *   - normalises case, whitespace and separators ("Slippers " -> "slippers")
 * A product with no category data at all is excluded from every
 * category (it still shows under "All"), so a category page can
 * never silently fall back to the whole catalogue.
 */
function normalise(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
}

/** Strips one trailing "s" so "bags"/"bag" and "shoes"/"shoe" compare equal. */
function canonicalise(value: string): string {
  return value.length > 2 && value.endsWith("s") ? value.slice(0, -1) : value
}

export function productCategoryKeys(item: ApiProductSummary): string[] {
  const list: Category[] = [
    ...(item.categories ?? []),
    ...((item as { category?: Category }).category ? [(item as { category?: Category }).category!] : []),
  ]
  return list
    .flatMap((c) => [normalise(c?.slug), normalise(c?.name)])
    .filter(Boolean)
    .map(canonicalise)
}

function filterSummariesByCategory(items: ApiProductSummary[], category: string) {
  const wanted = canonicalise(normalise(category))
  return items.filter((item) => productCategoryKeys(item).includes(wanted))
}

export async function fetchProductDetail(slug: string): Promise<ApiProductDetail | null> {
  const url = `${API_BASE}/products/${encodeURIComponent(slug)}`

  try {
    const data = await getJson<{ success?: boolean; data?: ApiProductDetail } | ApiProductDetail>(url)
    return "data" in data && data.data ? data.data : (data as ApiProductDetail)
  } catch (error) {
    console.error(`[giftij] failed to load product detail for "${slug}"`, error)
    return null
  }
}
