import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/layout/site-nav"
import { formatPrice } from "@/lib/format"
import { fetchOfferCampaign } from "@/lib/api/offers"

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const offer = await fetchOfferCampaign(slug)
  return { title: offer ? `${offer.campaign.title} — Giftij Brandy` : "Offer — Giftij Brandy", description: offer?.campaign.description ?? "Explore Giftij Brandy offers." }
}

export default async function OfferPage({ params }: PageProps) {
  const { slug } = await params
  const offer = await fetchOfferCampaign(slug)
  if (!offer || offer.products.length === 0) notFound()
  const { campaign, offerSet, products } = offer
  return (
    <>
      <SiteNav theme="light" />
      <main>
        <section className="gb-page-header">
          <div className="gb-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Offers</span></div>
          <span className="gb-page-eyebrow">Limited-time collection</span>
          <h1 className="gb-page-title">{campaign.title}</h1>
          {campaign.description && <p className="gb-page-sub">{campaign.description}</p>}
        </section>
        <section className="gb-shop-main">
          {campaign.creativeImageUrl && <div style={{ marginBottom: 28 }}><img src={campaign.creativeImageUrl} alt={campaign.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} /></div>}
          <div style={{ marginBottom: 28 }}>
            <p className="gb-section-label">Current offer</p>
            <h2 className="gb-section-title">{offerSet.title}</h2>
            {offerSet.description && <p className="gb-pdp-description">{offerSet.description}</p>}
          </div>
          <div className="gb-product-grid">
            {products.map((product) => (
              <Link key={product.slug} href={`/product/${encodeURIComponent(product.slug)}?offer=${encodeURIComponent(campaign.slug)}`} className="gb-product-card">
                <div className="gb-product-img-wrap">
                  {product.image ? <img src={product.image} alt={product.imageAlt} loading="lazy" /> : <div className="gb-product-img-placeholder" aria-hidden="true" />}
                  {product.discountPercent !== null && <span className="gb-product-badge">-{product.discountPercent}%</span>}
                </div>
                <p className="gb-product-name">{product.name}</p>
                <div className="gb-product-price-row"><span className="gb-product-price">{formatPrice(product.offerPrice)}</span>{product.offerPrice < product.basePrice && <span className="gb-product-price-old">{formatPrice(product.basePrice)}</span>}</div>
                {(product.freeDelivery || product.giftDescription) && <p style={{ marginTop: 6, fontSize: 12, color: "#75664f" }}>{[product.freeDelivery ? "Free delivery" : null, product.giftDescription].filter(Boolean).join(" · ")}</p>}
                <span className="gb-btn" style={{ display: "inline-flex", marginTop: 12 }}>{campaign.ctaText}</span>
              </Link>
            ))}
          </div>
          {campaign.endsAt && <p style={{ marginTop: 28, fontSize: 13, color: "#75664f" }}>Offer ends {new Date(campaign.endsAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}.</p>}
        </section>
      </main>
    </>
  )
}
