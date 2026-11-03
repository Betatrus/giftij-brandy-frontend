import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { JsonLd } from "@/components/seo/json-ld"
import { BLOG_POSTS } from "@/lib/blogs"
import { pageMetadata, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Fashion, Bag & Shoe Guides for Everyday Style",
  description: "Explore practical bag guides, shoe-shopping advice and simple care tips from Giftij Brandy. Helpful fashion reading for shoppers in Nigeria.",
  path: "/blogs",
})

export default function BlogsPage() {
  return (
    <>
      <SiteNav theme="light" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Giftij Brandy Blogs",
        description: "Practical fashion, shopping and product-care guides.",
        url: `${SITE_URL}/blogs`,
        isPartOf: { "@type": "WebSite", name: "Giftij Brandy", url: SITE_URL },
      }} />
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 88px" }}>
        <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 11, marginBottom: 12 }}>The Giftij Journal</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 6vw, 58px)", lineHeight: 1.12, maxWidth: 760, marginBottom: 16 }}>
          Style notes, shopping guides &amp; everyday care
        </h1>
        <p style={{ maxWidth: 680, lineHeight: 1.8, color: "#625b54", marginBottom: 44 }}>
          Useful ideas to help you choose, style and care for the bags, shoes and accessories that fit your everyday life.
        </p>
        <section aria-label="Latest articles" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 24 }}>
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} style={{ borderTop: "1px solid #d8d0c6", paddingTop: 20 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#82776b", marginBottom: 12 }}>{post.category} · {post.readTime}</p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 27, lineHeight: 1.25, marginBottom: 14 }}>
                <Link href={`/blogs/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{post.title}</Link>
              </h2>
              <p style={{ color: "#625b54", lineHeight: 1.75, marginBottom: 18 }}>{post.excerpt}</p>
              <Link href={`/blogs/${post.slug}`} style={{ textDecoration: "underline", textUnderlineOffset: 5 }}>Read the guide →</Link>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
