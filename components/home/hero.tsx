import Link from "next/link"

/**
 * Homepage hero, ported from public/index.html.
 * Video background + gradient fallback, "Uniquely You." headline,
 * and the two translucent pill CTAs (both see-through; the gold
 * one only fills in on hover).
 */
function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="gb-hero">
      <video className="gb-hero-video" autoPlay muted loop playsInline>
        <source src="/giftij_hero.mp4" type="video/mp4" />
      </video>
      <div className="gb-hero-bg" />
      <div className="gb-hero-glow" />
      <div className="gb-hero-overlay" />

      <div className="gb-hero-center">
        <h1 className="gb-hero-headline">Uniquely You.</h1>
        <p className="gb-hero-sub">
          Luxury fashion brand for the woman who knows her worth — from budget-friendly to high-end.
        </p>
        <div className="gb-hero-ctas">
          <Link href="/shop" className="gb-btn-gold-pill">
            SHOP NOW <ArrowIcon />
          </Link>
          <Link href="/story" className="gb-btn-ghost-pill">
            DISCOVER GIFTIJ BRANDY <ArrowIcon />
          </Link>
        </div>
        <div className="gb-hero-scroll">
          <span className="gb-scroll-text">SCROLL</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 0v18M1 12l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  )
}
