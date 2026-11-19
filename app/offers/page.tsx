import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { fetchActiveOfferCampaigns } from "@/lib/api/offers"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Current Offers | Giftij Brandy",
  description: "Explore all currently active Giftij Brandy campaigns and special offers.",
}

export default async function OffersDirectoryPage() {
  const campaigns = await fetchActiveOfferCampaigns()

  return (
    <>
      <SiteNav theme="dark" />
      <main className="min-h-screen bg-[#fbf8f2] text-[#243b32]">
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#a47d30]">
              Giftij Brandy
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Current Offers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6b756f] sm:text-base">
              Explore our active campaigns and discover the offers currently available.
              Select a campaign to see its products and benefits.
            </p>
          </div>

          {campaigns.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <article
                  key={campaign.id}
                  className="group overflow-hidden rounded-2xl border border-[#e8e0d2] bg-white shadow-[0_5px_24px_rgba(35,50,42,.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(35,50,42,.10)]"
                >
                  <Link href={`/offers/${encodeURIComponent(campaign.slug)}`} className="block h-full">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eee8dc]">
                      {campaign.creativeImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={campaign.creativeImageUrl}
                          alt={campaign.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#173f35] px-6 text-center text-[#f8f1df]">
                          <span className="font-display text-2xl">{campaign.title}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex min-h-44 flex-col p-5 sm:p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a47d30]">
                        Active campaign
                      </p>
                      <h2 className="mt-2 font-display text-2xl leading-snug text-[#243b32]">
                        {campaign.title}
                      </h2>
                      {campaign.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b756f]">
                          {campaign.description}
                        </p>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#9b762e]">
                        {campaign.ctaText || "Shop this campaign"}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-[#d8cfbd] bg-white/70 px-6 py-12 text-center">
              <h2 className="font-display text-2xl">No active offers right now</h2>
              <p className="mt-3 text-sm leading-6 text-[#6b756f]">
                Please check back soon, or explore the latest collections in our shop.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#173f35] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#245647]"
              >
                Explore the shop
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
