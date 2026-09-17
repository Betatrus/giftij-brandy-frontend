import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { ProductGrid } from "@/components/shop/product-grid"
import { getVariantCards } from "@/lib/api/adapter"
import { CATEGORIES, isCategorySlug, type CategorySlug } from "@/lib/api/config"

export const metadata: Metadata = { title: "Shop — Giftij Brandy" }

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const requested = params.category?.toLowerCase()
  const category: CategorySlug | undefined =
    requested && isCategorySlug(requested) ? requested : undefined

  const cards = await getVariantCards(category ? { category } : {})
  const categoryName = category ? CATEGORIES.find((c) => c.slug === category)?.name : undefined

  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <div className="gb-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          {category ? <a href="/shop">Shop</a> : <span>Shop</span>}
          {category && (
            <>
              <span>/</span>
              <span>{categoryName}</span>
            </>
          )}
        </div>
        <span className="gb-page-eyebrow">The Collection</span>
        <span className="gb-page-title">Shop All{categoryName ? ` ${categoryName}` : ""}</span>
        <span className="gb-page-sub">Uniquely maintain your style with us.</span>
      </section>

      <main className="gb-shop-main">
        <div className="gb-shop-toolbar">
          <p className="gb-result-count">
            <strong>{cards.length}</strong> product{cards.length === 1 ? "" : "s"}
          </p>
        </div>
        <ProductGrid cards={cards} />
      </main>
    </>
  )
}
