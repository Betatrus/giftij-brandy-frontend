import type { MetadataRoute } from "next";
import { fetchProductSummaries } from "@/lib/api/products";
import { CATEGORIES } from "@/lib/api/config";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { fetchBlogPosts, fetchBlogSettings } from "@/lib/api/blog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts, blogSettings] = await Promise.all([
    fetchProductSummaries(),
    fetchBlogPosts(),
    fetchBlogSettings(),
  ]);
  const siteOrigin = new URL(SITE_URL).origin;

  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/story"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
    ...CATEGORIES.map((category) => ({
      url: absoluteUrl(`/shop?category=${encodeURIComponent(category.slug)}`),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...products
      .filter((product) => Boolean(product.slug?.trim()))
      .map((product) => ({
        url: absoluteUrl(`/product/${encodeURIComponent(product.slug)}`),
        changeFrequency: "daily" as const,
        priority: 0.7,
      })),
    ...(blogSettings.blogIndexingEnabled
      ? [
          {
            url: absoluteUrl("/blog"),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          ...blogPosts
            .filter((post) => {
              if (!post.slug?.trim() || !post.isIndexable) return false;
              if (!post.canonicalUrl) return true;
              try {
                return new URL(post.canonicalUrl).origin === siteOrigin;
              } catch {
                return false;
              }
            })
            .map((post) => {
              const canonical = post.canonicalUrl;
              const canonicalIsSameSite = canonical
                ? (() => {
                    try {
                      return new URL(canonical).origin === siteOrigin;
                    } catch {
                      return false;
                    }
                  })()
                : false;

              return {
                url: canonicalIsSameSite
                  ? canonical!
                  : absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`),
                lastModified: new Date(post.updatedAt),
                changeFrequency: "monthly" as const,
                priority: post.isFeatured ? 0.8 : 0.6,
              };
            }),
        ]
      : []),
  ];
}
