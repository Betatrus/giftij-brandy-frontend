import "server-only"

import {
  SERVER_API_BASE,
  getStorefrontApiSecret,
} from "./server-config"

import type {
  ApiProductDetail,
  ApiProductSummary,
  Category,
} from "./types"

/**
 * Server-only typed wrappers around the Giftij product REST API.
 *
 * Product catalogue requests are made by the Next.js storefront server,
 * not directly by the customer's browser.
 *
 * Every product request carries the private X-Storefront-Key header.
 * The secret itself never ships to the browser.
 */

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "X-Storefront-Key": getStorefrontApiSecret(),
    },

    // The admin API already has its own controlled cache/invalidation.
    // The storefront should not keep a second stale copy of product data,
    // especially after a product is deleted or unpublished in admin.
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(
      `Giftij API request failed (${res.status}): ${url}`,
    )
  }

  return res.json() as Promise<T>
}

export interface FetchProductsOptions {
  category?: string
  pageSize?: number
  sort?: string
}

/**
 * Fetches the full active storefront catalogue from the protected
 * server-to-server product API.
 */
export async function fetchProductSummaries(
  options: FetchProductsOptions = {},
): Promise<ApiProductSummary[]> {
  const { category, sort = "newest" } = options

  const perPage = 50
  const MAX_PAGES = 20

  const all: ApiProductSummary[] = []

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const params = new URLSearchParams({
        sort,
        page: String(page),
        pageSize: String(perPage),
      })

      if (category) {
        params.set("category", category)
      }

      const data = await getJson<
        ApiListEnvelope<ApiProductSummary> & {
          meta?: {
            pageCount?: number
          }
        }
      >(
        `${SERVER_API_BASE}/products?${params.toString()}`,
      )

      const items = unwrapList(data)

      all.push(...items)

      const pageCount = !Array.isArray(data)
        ? data.meta?.pageCount
        : undefined

      if (
        !pageCount ||
        page >= pageCount ||
        items.length === 0
      ) {
        break
      }
    }

    return category
      ? filterSummariesByCategory(all, category)
      : all
  } catch (error) {
    console.error(
      "[giftij] failed to load product summaries",
      error,
    )

    return []
  }
}

/**
 * The list endpoint returns:
 *
 * {
 *   success: true,
 *   data: [...],
 *   meta: {...}
 * }
 *
 * This helper also accepts the plain-array shape defensively.
 */
type ApiListEnvelope<T> =
  | {
      success?: boolean
      data?: T[]
      items?: T[]
    }
  | T[]

function unwrapList<T>(
  payload: ApiListEnvelope<T>,
): T[] {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? payload.items ?? []
}

/**
 * Category matching.
 *
 * Matches on slug OR display name and tolerates
 * singular/plural forms.
 */
function normalise(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
}

function canonicalise(value: string): string {
  return value.length > 2 && value.endsWith("s")
    ? value.slice(0, -1)
    : value
}

export function productCategoryKeys(
  item: ApiProductSummary,
): string[] {
  const list: Category[] = [
    ...(item.categories ?? []),

    ...((item as { category?: Category }).category
      ? [
          (item as { category?: Category })
            .category!,
        ]
      : []),
  ]

  return list
    .flatMap((c) => [
      normalise(c?.slug),
      normalise(c?.name),
    ])
    .filter(Boolean)
    .map(canonicalise)
}

function filterSummariesByCategory(
  items: ApiProductSummary[],
  category: string,
) {
  const wanted = canonicalise(
    normalise(category),
  )

  return items.filter((item) =>
    productCategoryKeys(item).includes(wanted),
  )
}

export async function fetchProductDetail(
  slug: string,
): Promise<ApiProductDetail | null> {
  const url =
    `${SERVER_API_BASE}/products/` +
    encodeURIComponent(slug)

  try {
    const data = await getJson<
      | {
          success?: boolean
          data?: ApiProductDetail
        }
      | ApiProductDetail
    >(url)

    return "data" in data && data.data
      ? data.data
      : (data as ApiProductDetail)
  } catch (error) {
    console.error(
      `[giftij] failed to load product detail for "${slug}"`,
      error,
    )

    return null
  }
}