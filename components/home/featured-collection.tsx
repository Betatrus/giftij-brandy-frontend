import Link from "next/link"
import { CATEGORIES } from "@/lib/api/config"
import { ImageOrFallback } from "@/components/ui/image-or-fallback"

/**
 * "Featured Collection" — now a category showcase (Bags / Shoes /
 * Slippers) instead of the old decorative bag artwork.
 *
 * IMAGES: each card looks for an image in /public named after the
 * category slug, e.g. public/bags.jpg, public/shoes.jpg,
 * public/slippers.jpg. Drop the files in with those exact names and
 * they appear here automatically — no code change needed. If the file
 * isn't there yet, ImageOrFallback swaps to a neutral placeholder
 * instead of a browser's broken-image icon.
 *
 * No prices on these frames by design: they point at a category,
 * not a single product. Each card's CTA is "See More" and links to
 * that category on the Shop page.
 */

function CategoryPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ede0cc",
        color: "rgba(26,26,26,0.25)",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
    </div>
  )
}

export function FeaturedCollection() {
  return (
    <section className="gb-section">
      <div className="gb-section-header">
        <div>
          <p className="gb-section-label">Curated For You</p>
          <h2 className="gb-section-title">Featured Collection</h2>
          <p className="gb-section-sub">
            Explore the collection by category — where artisanship meets the art of being a woman.
          </p>
        </div>
        <Link href="/shop" className="gb-btn gb-btn-outline">
          View All Pieces
        </Link>
      </div>

      <div className="gb-category-grid">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="gb-category-card"
          >
            <div className="gb-category-img-wrap">
              <ImageOrFallback
                src={`/${category.slug}.jpg`}
                alt={category.name}
                className="gb-category-img"
                fallback={<CategoryPlaceholder />}
              />
            </div>
            <div className="gb-category-overlay">
              <p className="gb-category-name">{category.name}</p>
              <span className="gb-category-cta">
                See More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

