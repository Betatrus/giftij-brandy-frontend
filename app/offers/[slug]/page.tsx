import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { formatPrice } from "@/lib/format"
import { fetchOfferCampaign } from "@/lib/api/offers"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ set?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { set } = await searchParams
  const offer = await fetchOfferCampaign(slug, set)

  if (offer && "expired" in offer) {
    return {
      title: `${offer.campaign.title} — Offer Ended | Giftij Brandy`,
      description: offer.campaign.description ?? "This Giftij Brandy offer has ended.",
    }
  }

  return {
    title: offer ? `${offer.campaign.title} — Giftij Brandy` : "Offers — Giftij Brandy",
    description: offer?.campaign.description ?? "Explore curated Giftij Brandy offers.",
  }
}

function CampaignBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-3 text-xs tracking-wide text-[#766e62]">
      <Link href="/" className="transition hover:text-[#9b7930]">Home</Link>
      <span aria-hidden="true">/</span>
      <span>Offers</span>
    </nav>
  )
}

export default async function OfferPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { set } = await searchParams
  const offer = await fetchOfferCampaign(slug, set)

  if (!offer) {
    return (
      <>
        <SiteNav theme="light" />
        <main className="min-h-[60vh] bg-[#fdfaf5] px-6 pb-20 pt-36 text-center">
          <p className="gb-serif italic text-[#a9822c]">Giftij Brandy offers</p>
          <h1 className="mt-3 gb-serif text-3xl text-[#1a1a1a] sm:text-5xl">This offer is unavailable</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#766e62]">
            The link may have changed, or this campaign is not currently available.
          </p>
          <Link href="/shop" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a84c] px-8 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a]">
            Explore the shop
          </Link>
        </main>
      </>
    )
  }

  if ("expired" in offer) {
    return (
      <>
        <SiteNav theme="light" />
        <main className="min-h-[70vh] bg-[#fdfaf5] px-6 pb-20 pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <CampaignBreadcrumb />
            <p className="gb-serif italic text-[#a9822c]">Campaign ended</p>
            <h1 className="mt-4 gb-serif text-4xl leading-tight text-[#1a1a1a] sm:text-6xl">{offer.campaign.title}</h1>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#c9a84c]" />
            <p className="mx-auto max-w-xl text-base leading-8 text-[#766e62]">
              This offer is no longer available. Thank you for your interest in Giftij Brandy.
            </p>
            {offer.campaign.endsAt && (
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[#9b7930]">
                Offer ended {new Date(offer.campaign.endsAt).toLocaleDateString("en-NG", { dateStyle: "long" })}
              </p>
            )}
            <Link href="/shop" className="mt-9 inline-flex min-h-12 items-center justify-center bg-[#1a1a1a] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#c9a84c] hover:text-[#1a1a1a]">
              Discover the collection
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (offer.products.length === 0) {
    const campaign = offer.campaign
    return (
      <>
        <SiteNav theme="light" />
        <main className="min-h-[60vh] bg-[#fdfaf5] px-6 pb-20 pt-36 text-center">
          <CampaignBreadcrumb />
          <p className="gb-serif italic text-[#a9822c]">Giftij Brandy campaign</p>
          <h1 className="mt-3 gb-serif text-3xl text-[#1a1a1a] sm:text-5xl">{campaign.title}</h1>
          {campaign.description && <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-sm leading-7 text-[#766e62]">{campaign.description}</p>}
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#766e62]">This campaign is active. Its offer selections are currently unavailable. Please check back soon.</p>
          <Link href="/shop" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a84c] px-8 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a]">Explore the shop</Link>
        </main>
      </>
    )
  }

  const { campaign, offerSet, products } = offer
  return (
    <>
      <SiteNav theme="light" />

      <main className="min-h-screen bg-[#fdfaf5]">
        <section className="relative overflow-hidden border-b border-[#c9a84c]/20 bg-[#1a1a1a] text-white">
          {campaign.creativeImageUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={campaign.creativeImageUrl} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17130d]/95 via-[#17130d]/75 to-[#17130d]/30" />
            </>
          )}
          <div className="relative mx-auto grid min-h-[360px] max-w-[1320px] items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] lg:px-16">
            <div className="max-w-3xl">
              <CampaignBreadcrumb />
              <p className="gb-serif italic text-[#e8d5a3]">A limited Giftij Brandy edit</p>
              <h1 className="mt-4 gb-serif text-4xl font-medium leading-[1.08] text-white sm:text-6xl lg:text-7xl">{campaign.title}</h1>
              {campaign.description && (
                <div className="mt-6 max-w-2xl border-l border-[#c9a84c] pl-5 sm:pl-7">
                  <p className="whitespace-pre-line text-base leading-8 text-white/85 sm:text-lg">{campaign.description}</p>
                </div>
              )}
              <a href="#offer-products" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a84c] px-8 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-[#e8d5a3]">
                {campaign.ctaText}
              </a>
            </div>
            {campaign.creativeImageUrl && (
              <div className="hidden justify-self-end lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={campaign.creativeImageUrl} alt={campaign.title} fetchPriority="high" className="max-h-[330px] w-full max-w-[390px] object-cover shadow-2xl ring-1 ring-white/20" />
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div id="offer-products" className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
              <Link
                key={`${product.slug}-${product.offerSetId}`}
                href={`/product/${encodeURIComponent(product.slug)}?offer=${encodeURIComponent(campaign.slug)}&set=${encodeURIComponent(product.offerSetId)}`}
                className="group flex h-full flex-col text-inherit no-underline"
              >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[#f0eae0]">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-[#a39a8c]">Giftij Brandy</div>
                  )}
                  {product.offerPrice < product.basePrice && (
                    <span className="absolute left-3 top-3 bg-[#c9a84c] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">
                      {product.discountPercent !== null ? `${product.discountPercent}% off` : `${formatPrice(product.discountAmount ?? product.basePrice - product.offerPrice)} off`}
                    </span>
                  )}
                </div>
                <p className="gb-serif text-lg leading-snug text-[#1a1a1a] transition group-hover:text-[#9b7930] sm:text-xl">{product.name}</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold text-[#1a1a1a] sm:text-base">{formatPrice(product.offerPrice)}</span>
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
                <span className="mt-4 inline-flex min-h-11 items-center justify-center border border-[#1a1a1a] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#1a1a1a] transition group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]">
                  {campaign.ctaText}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
