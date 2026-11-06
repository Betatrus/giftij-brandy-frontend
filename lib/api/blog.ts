import "server-only";
import { SERVER_API_BASE, getStorefrontApiHeaders } from "./server-config";

export type BlogPostSummary = {
  id: string; title: string; slug: string; excerpt: string; type: string; tags: string[];
  coverImageUrl: string | null; coverImageAlt: string | null; seoTitle: string | null;
  seoDescription: string | null; canonicalUrl: string | null; isFeatured: boolean;
  isIndexable: boolean; publishedAt: string | null; updatedAt: string;
  category: { name: string; slug: string; description: string | null; seoTitle: string | null; seoDescription: string | null } | null;
};
export type BlogPost = BlogPostSummary & { contentMarkdown: string };
type BlogPostResult = BlogPost | { redirectTo: string };

async function request<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${SERVER_API_BASE}${path}`, {
      headers: getStorefrontApiHeaders(), cache: "no-store",
    });
    if (!response.ok) return null;
    const payload = await response.json();
    if (payload?.success === false) return null;
    return (payload?.data ?? payload) as T;
  } catch (error) {
    console.error("[giftij] blog API request failed", error);
    return null;
  }
}
export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  const result = await request<BlogPostSummary[] | {items?:BlogPostSummary[]}>("/blog");
  return Array.isArray(result) ? result : result?.items ?? [];
}
export async function fetchBlogPost(slug: string): Promise<BlogPostResult | null> {
  return request<BlogPostResult>(`/blog/${encodeURIComponent(slug)}`);
}
export async function fetchBlogSettings(): Promise<{blogNavigationVisible:boolean;blogIndexingEnabled:boolean}> {
  return (await request<{blogNavigationVisible:boolean;blogIndexingEnabled:boolean}>("/blog-settings")) ?? {blogNavigationVisible:false,blogIndexingEnabled:false};
}
