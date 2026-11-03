import type { MetadataRoute } from "next"
import { fetchProductSummaries } from "@/lib/api/products"
import { CATEGORIES } from "@/lib/api/config"
import { absoluteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProductSummaries()

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/shop"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...CATEGORIES.map((category) => ({
      url: absoluteUrl(`/shop?category=${encodeURIComponent(category.slug)}`),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${encodeURIComponent(product.slug)}`),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ]
}
