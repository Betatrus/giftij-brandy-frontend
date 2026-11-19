import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { formatPrice } from "@/lib/format"
import { fetchActiveOfferCampaigns } from "@/lib/api/offers"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Current Offers | Giftij Brandy",
  description: "Shop products across all current Giftij Brandy campaigns and discover their special offers.",
}

export default async function OffersDirectoryPage() {
  const campaigns = await fetchActiveOfferCampaigns()

  return (
    <>
      <SiteNav theme="dark" />
      <main className="min-h-screen bg-[#fbf8f2] text-[#1a1a1a]">
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
          <header className="mb-12 text-center sm:mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a47d30]">Giftij Brandy</p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Offers</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#625b50] sm:text-base">
              See Giftij Brandy limited offers for today. Rush now and shop your favourites.
            </p>
          </header>

          {campaigns.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {campaigns.flatMap((campaign) => campaign.products.map((product) => (
                <article key={campaign.id + ":" + product.slug} className="group min-w-0">
                  <Link href={campaign.url} className="block">
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[#eee8dc]">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-[#a39a8c]">Giftij Brandy</div>
                      )}
                      {product.offerPrice < product.basePrice && (
                        <span className="absolute left-2 top-2 bg-[#c9a84c] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a] sm:left-3 sm:top-3 sm:px-3 sm:py-2 sm:text-[10px]">
                          {product.discountPercent !== null ? product.discountPercent + "% off" : "Special offer"}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-base leading-snug text-[#1a1a1a] transition group-hover:text-[#9b7930] sm:text-lg">{product.name}</h2>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-sm font-semibold text-[#1a1a1a]">{formatPrice(product.offerPrice)}</span>
                      {product.offerPrice < product.basePrice && <span className="text-xs text-[#8a8175] line-through">{formatPrice(product.basePrice)}</span>}
                    </div>
                    <p className="mt-2 min-h-10 text-xs font-medium leading-5 text-[#8a713c]">
                      {[
                        product.discountPercent !== null && product.discountPercent > 0
                          ? `${Number(product.discountPercent)}% discount sale`
                          : product.discountAmount !== null && product.discountAmount > 0
                            ? `Save ${formatPrice(product.discountAmount)}`
                            : null,
                        product.freeDelivery ? "Free delivery" : null,
                        product.giftDescription || null,
                      ].filter(Boolean).join(" · ") || "Limited campaign offer"}
                    </p>
                    <span className="mt-4 inline-flex min-h-10 items-center border-b border-[#c9a84c] text-[10px] font-bold uppercase tracking-[0.13em] text-[#1a1a1a]">
                      View campaign <span className="ml-2 text-[#9b7930]" aria-hidden="true">→</span>
                    </span>
                  </Link>
                </article>
              )))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h2 className="font-display text-2xl">No active offers right now</h2>
              <p className="mt-3 text-sm leading-6 text-[#625b50]">Please check back soon, or explore the latest collections in our shop.</p>
              <Link href="/shop" className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#1a1a1a] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a84c] hover:text-[#1a1a1a]">Explore the shop</Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
