import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Giftij Brandy Journal",
  description: "Practical shopping guides, product-care advice and customer stories from Giftij Brandy.",
  path: "/blog",
  noIndex: true,
})

export default function BlogPage() {
  return (
    <>
      <SiteNav theme="light" />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "88px 24px 104px", textAlign: "center" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9b7a35", marginBottom: 18 }}>
          The Giftij Journal
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 6vw, 58px)", lineHeight: 1.15, marginBottom: 20 }}>
          Helpful guides. Real stories. Better choices.
        </h1>
        <p style={{ maxWidth: 650, margin: "0 auto", color: "#625b54", fontSize: 18, lineHeight: 1.8 }}>
          We&apos;re preparing our collection of product guides, care advice and customer stories.
          Visit again soon.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
