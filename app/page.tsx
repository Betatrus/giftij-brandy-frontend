import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { Hero } from "@/components/home/hero"
import { Marquee } from "@/components/home/marquee"
import { FeaturedCollection } from "@/components/home/featured-collection"
import { Lifestyle } from "@/components/home/lifestyle"
import { Reviews } from "@/components/home/reviews"
import { ProductGrid } from "@/components/shop/product-grid"
import { getVariantCards } from "@/lib/api/adapter"
import { HOMEPAGE_PLACEMENT } from "@/lib/api/config"

export const metadata: Metadata = pageMetadata({
  title: "Bags, Shoes & Slippers Online in Nigeria",
  description: "Discover stylish bags, shoes and slippers at Giftij Brandy. Shop fashion essentials online from Port Harcourt, Nigeria.",
  path: "/",
})

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const allCards = await getVariantCards()

  /*
   * Best Sellers is controlled exclusively by the Admin dashboard's
   * Homepage Placement configuration. A product appears here only
   * when the Admin API has explicitly flagged it. There is NO
   * fallback to "all products", "newest" or "first result" — an
   * empty placement renders an empty section, by design.
   */
  const bestSellers = allCards.filter((card) =>
    card.featuredFlags.includes(HOMEPAGE_PLACEMENT.bestSellers),
  )

  return (
    <>
      <SiteNav theme="dark" />
      <Hero />
      <Marquee />
      <FeaturedCollection />

      <section className="gb-section">
        <div className="gb-section-header">
          <div>
            <p className="gb-section-label">Loved By Many</p>
            <h2 className="gb-section-title">Best Sellers</h2>
          </div>

          <Link href="/shop" className="gb-btn gb-btn-outline">
            View All
          </Link>
        </div>

        <ProductGrid
          cards={bestSellers}
          emptyMessage="No Best Sellers have been selected in the Admin dashboard yet."
        />
      </section>

      <Reviews />
      <Lifestyle />
      <SiteFooter />
    </>
  )
}
