import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { formatPrice } from "@/lib/format"
import { fetchOfferCampaign } from "@/lib/api/offers"
import { CampaignAnnouncementPopup } from "@/components/shop/campaign-announcement-popup"

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

function styleCampaignAnnouncement(html: string) {
  const styles = `<style>
    :root { color-scheme: light; }
    html, body { margin: 0 !important; padding: 0 !important; min-height: 0 !important; background: transparent !important; }
    body { box-sizing: border-box !important; padding: clamp(22px, 4vw, 48px) !important; color: #243b32 !important; font-family: Arial, Helvetica, sans-serif !important; border: 0 !important; box-shadow: none !important; }
    body * { box-sizing: border-box; }
    body > div, main, section, article { border: 0 !important; box-shadow: none !important; max-width: 100% !important; }
    h1, h2, h3 { margin: 0 0 18px !important; color: #243b32 !important; font-family: Georgia, 'Times New Roman', serif !important; font-size: clamp(25px, 4vw, 42px) !important; font-weight: 400 !important; line-height: 1.18 !important; letter-spacing: -0.025em !important; }
    p { margin: 0 0 14px !important; color: #59675f !important; font-family: Arial, Helvetica, sans-serif !important; font-size: clamp(14px, 1.5vw, 17px) !important; line-height: 1.75 !important; }
    img { display: block; max-width: 100% !important; height: auto !important; border: 0 !important; }
    a { color: #243b32 !important; }
    @media (max-width: 600px) { body { padding: 22px !important; } }
  </style>`;
  const headEnd = html.toLowerCase().indexOf("</head>");
  return headEnd >= 0 ? html.slice(0, headEnd) + styles + html.slice(headEnd) : styles + html;
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
    return (
      <>
        <SiteNav theme="light" />
        <main className="min-h-[60vh] bg-[#fdfaf5] px-6 pb-20 pt-36 text-center">
          <p className="gb-serif italic text-[#a9822c]">Giftij Brandy offers</p>
          <h1 className="mt-3 gb-serif text-3xl text-[#1a1a1a]">Products are being refreshed</h1>
          <p className="mt-4 text-sm leading-7 text-[#766e62]">Please explore the shop while this offer is updated.</p>
          <Link href="/shop" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a84c] px-8 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a]">Explore the shop</Link>
        </main>
      </>
    )
  }

  const { campaign, offerSet, offerSets, products } = offer
  return (
    <>
      <SiteNav theme="light" />
      <CampaignAnnouncementPopup
        title={campaign.title}
        description={campaign.description}
        imageUrl={campaign.creativeImageUrl}
        announcementHtml={campaign.announcementHtml}
      />

      <main className="min-h-screen bg-[#fdfaf5]">
        <section className="relative overflow-hidden border-b border-[#c9a84c]/20 bg-[#1a1a1a] text-white">
          {campaign.creativeImageUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={campaign.creativeImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17130d]/95 via-[#17130d]/75 to-[#17130d]/30" />
            </>
          )}
          <div className="relative mx-auto grid min-h-[360px] max-w-[1320px] items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] lg:px-16">
            <div className="max-w-3xl">
              <CampaignBreadcrumb />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8d5a3]">Offer</p>
              <h1 className="mt-4 gb-serif text-4xl font-medium leading-[1.08] sm:text-6xl lg:text-7xl">{campaign.title}</h1>
              {campaign.description && (
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{campaign.description}</p>
              )}
              <a href="#offer-products" className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a84c] px-8 text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-[#e8d5a3]">
                {campaign.ctaText}
              </a>
            </div>
            {campaign.creativeImageUrl && (
              <div className="hidden justify-self-end lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={campaign.creativeImageUrl} alt={campaign.title} className="max-h-[330px] w-full max-w-[390px] object-cover shadow-2xl ring-1 ring-white/20" />
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          {campaign.announcementHtml && (
            <section aria-label="Campaign details" className="mb-14 overflow-hidden rounded-[1.75rem] bg-[#f1ece2]">
              <iframe
                title={`${campaign.title} campaign details`}
                srcDoc={styleCampaignAnnouncement(campaign.announcementHtml)}
                sandbox=""
                referrerPolicy="no-referrer"
                loading="lazy"
                className="min-h-[220px] w-full border-0 sm:min-h-[280px]"
              />
            </section>
          )}

          {offerSets.length > 1 && (
            <nav aria-label="Campaign offer sets" className="mb-12 flex flex-wrap gap-2 border-b border-[#e8e0d8] pb-6">
              {offerSets.map((setOption) => (
                <Link
                  key={setOption.id}
                  href={setOption.id === campaign.defaultOfferSetId
                    ? `/offers/${encodeURIComponent(campaign.slug)}`
                    : `/offers/${encodeURIComponent(campaign.slug)}?set=${encodeURIComponent(setOption.id)}`}
                  aria-current={setOption.id === offerSet.id ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center border px-5 text-xs font-semibold uppercase tracking-[0.12em] transition ${setOption.id === offerSet.id ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-[#d8cdbb] bg-transparent text-[#625b50] hover:border-[#c9a84c]"}`}
                >
                  {setOption.title}
                </Link>
              ))}
            </nav>
          )}

          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="gb-serif italic text-[#a9822c]">Selected for this campaign</p>
              <h2 className="mt-2 gb-serif text-3xl text-[#1a1a1a] sm:text-4xl">{offerSet.title}</h2>
              {offerSet.description && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#766e62]">{offerSet.description}</p>}
            </div>
            <div className="text-sm text-[#766e62]">
              <span>{products.length} {products.length === 1 ? "piece" : "pieces"} in this edit</span>
              {campaign.endsAt && (
                <span className="mt-2 block text-xs uppercase tracking-[0.1em] text-[#9b7930]">
                  Ends {new Date(campaign.endsAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}
                </span>
              )}
              {campaign.maxQualifyingOrders !== null && (
                <span className="mt-1 block text-xs text-[#766e62]">
                  Limited to {campaign.maxQualifyingOrders} qualifying orders
                </span>
              )}
            </div>
          </div>

          <div id="offer-products" className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${encodeURIComponent(product.slug)}?offer=${encodeURIComponent(campaign.slug)}&set=${encodeURIComponent(offerSet.id)}`}
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
                {(product.freeDelivery || product.giftDescription) && (
                  <p className="mt-2 text-xs leading-5 text-[#8a713c]">
                    {[product.freeDelivery ? "Complimentary delivery" : null, product.giftDescription].filter(Boolean).join(" · ")}
                  </p>
                )}
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
