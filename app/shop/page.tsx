import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { pageMetadata, SITE_URL } from "@/lib/seo"
import { SiteNav } from "@/components/layout/site-nav"
import { ProductGrid } from "@/components/shop/product-grid"
import { ShopSearch } from "@/components/shop/shop-search"
import { getVariantCards } from "@/lib/api/adapter"
import { CATEGORIES, isCategorySlug, type CategorySlug } from "@/lib/api/config"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  const requested = params.category?.toLowerCase()
  const category = requested && isCategorySlug(requested) ? requested : undefined
  const query = params.q?.trim().slice(0, 80) ?? ""
  const categoryName = category ? CATEGORIES.find((item) => item.slug === category)?.name : undefined
  const title = query
    ? `Search results for “${query}”`
    : categoryName
      ? `Shop ${categoryName} Online in Nigeria`
      : "Shop Bags, Shoes & Slippers Online in Nigeria"
  const description = query
    ? `Explore Giftij Brandy products matching “${query}”. Review product details, available options and current prices.`
    : categoryName
      ? `Explore stylish ${categoryName.toLowerCase()} at Giftij Brandy. Shop online from Port Harcourt, Nigeria, and view current product details and availability.`
      : "Explore bags, shoes and slippers at Giftij Brandy. Browse the online collection and find fashion pieces for everyday style in Nigeria."

  return pageMetadata({
    title,
    description,
    path: category ? `/shop?category=${encodeURIComponent(category)}` : "/shop",
    noIndex: Boolean(query),
  })
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const params = await searchParams
  const requested = params.category?.toLowerCase()
  const category: CategorySlug | undefined =
    requested && isCategorySlug(requested) ? requested : undefined
  const query = params.q?.trim() ?? ""

  const cards = await getVariantCards({
    ...(category ? { category } : {}),
    ...(query ? { q: query } : {}),
  })

  const categoryName = category
    ? CATEGORIES.find((c) => c.slug === category)?.name
    : undefined

  return (
    <>
      <SiteNav theme="light" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: categoryName ? `Giftij Brandy ${categoryName}` : "Giftij Brandy Shop",
        url: category ? `${SITE_URL}/shop?category=${encodeURIComponent(category)}` : `${SITE_URL}/shop`,
        isPartOf: { "@type": "WebSite", name: "Giftij Brandy", url: SITE_URL },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
          ...(categoryName ? [{ "@type": "ListItem", position: 3, name: categoryName, item: `${SITE_URL}/shop?category=${encodeURIComponent(category!)}` }] : []),
        ],
      }} />
      <section className="gb-page-header">
        <div className="gb-breadcrumb">
          <a href="/">Home</a><span>/</span>
          {category ? <a href="/shop">Shop</a> : <span>Shop</span>}
          {category && <><span>/</span><span>{categoryName}</span></>}
        </div>
        <span className="gb-page-eyebrow">{query ? "Your Search" : "The Collection"}</span>
        <h1 className="gb-page-title">
          {query ? `Results for “${query.slice(0, 80)}”` : `Shop All${categoryName ? ` ${categoryName}` : ""}`}
        </h1>
        <span className="gb-page-sub">{query ? "Explore products that match your search." : "Uniquely maintain your style with us."}</span>
      </section>
      <main className="gb-shop-main">
        <ShopSearch initialQuery={query} category={category} placeholder={`Search ${categoryName?.toLowerCase() ?? "products"}...`} />
        <div className="gb-shop-toolbar">
          <p className="gb-result-count">
            {query ? <><strong>{cards.length}</strong> result{cards.length === 1 ? "" : "s"} for <span>“{query}”</span></> : <><strong>{cards.length}</strong> product{cards.length === 1 ? "" : "s"}</>}
          </p>
        </div>
        {cards.length > 0 ? <ProductGrid cards={cards} /> : (
          <div className="gb-empty-state">
            <p>No products found{query ? ` for “${query}”.` : "."}</p>
            <p style={{ marginTop: 8, fontSize: 14 }}>Try another product name or clear your search.</p>
          </div>
        )}
      </main>
    </>
  )
}
