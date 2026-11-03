import Link from "next/link"
import { formatPrice, getDiscountedPrice } from "@/lib/format"
import type { VariantCard } from "@/lib/api/types"
import { storefrontImageUrl } from "@/lib/images"

export function ProductCard({ card, priority = false }: { card: VariantCard; priority?: boolean }) {
  const discountedPrice = getDiscountedPrice(card.price, card.discount, card.discountedPrice)
  const href = card.colorSlug
    ? `/product/${card.productSlug}?color=${card.colorSlug}`
    : `/product/${card.productSlug}`
  const badge = card.featuredFlags[0]

  return (
    <Link href={href} className="gb-product-card">
      <div className="gb-product-img-wrap">
        {badge && <span className="gb-product-badge">{badge}</span>}
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- images come
          // from Cloudinary; delivery transformations request right-sized,
          // modern formats while preserving the source asset.
          <img src={storefrontImageUrl(card.image, 640)} alt={`${card.name}${card.colour ? ` — ${card.colour}` : ""}`} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
        ) : (
          // No fallback to the product cover/gallery image here on purpose —
          // a card must only ever show this colour's own photo. A neutral
          // placeholder is honest about missing data instead of showing an
          // unrelated (possibly wrong-colour) image.
          <div className="gb-product-img-placeholder" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="M21 15l-5-5-9 9" />
            </svg>
          </div>
        )}
      </div>
      <p className="gb-product-name">{card.name}</p>
      {card.colour && <p className="gb-product-colour">{card.colour}</p>}
      <div className="gb-product-price-row">
        <span className="gb-product-price">{formatPrice(discountedPrice ?? card.price)}</span>
        {discountedPrice !== null && (
          <span className="gb-product-price-old">{formatPrice(card.price)}</span>
        )}
      </div>
    </Link>
  )
}
