/** Scrolling brand strip, ported from public/index.html. */
const ITEMS = [
  "Uniquely Maintain Your Style",
  "Everything Fashion Bags",
  "Budget Friendly · Quality · Luxury",
  "Giftij Brandy",
  "You Deserve to Shine",
  "Arrive. Impress. Conquer.",
]

export function Marquee() {
  return (
    <div className="gb-marquee" aria-hidden="true">
      <div className="gb-marquee-inner">
        {[0, 1].map((copy) => (
          <div className="gb-marquee-item" key={copy}>
            {ITEMS.map((item) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
                <span>{item}</span>
                <span className="gb-marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
