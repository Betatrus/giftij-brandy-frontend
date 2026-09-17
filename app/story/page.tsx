import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { ImageOrFallback } from "@/components/ui/image-or-fallback"

/** Our Story — content ported from public/story.html. */
export const metadata: Metadata = { title: "Our Story — Giftij Brandy" }

const VALUES = [
  { title: "Craftsmanship", desc: "Every stitch is placed with intention. We take no shortcuts because your bag deserves none." },
  { title: "Made for Her", desc: "Designed around the real life of real women — boardrooms, markets, weddings, and everything between." },
  { title: "Built to Last", desc: "Premium leather that gets better with age. A bag from us is not a purchase — it's an heirloom." },
  { title: "Community First", desc: "Our customers aren't just clients — they're a sisterhood. We grow together." },
]

const TIMELINE = [
  { year: "2020", title: "The First Stitch", text: "Founded in a small Lagos workshop with three artisans and a vision. The first collection — six bags — sold out in 48 hours through word of mouth alone." },
  { year: "2021", title: "The Empress Tote is Born", text: "Our signature piece launched. Within months it became the most-photographed bag at Lagos Fashion Week and across Nigerian social media." },
  { year: "2022", title: "The Workshop Grows", text: "We moved to a full atelier. Now with 12 master artisans, all trained in-house on our exacting standards. Production triples. Quality never slips." },
  { year: "2025", title: "The Digital Chapter", text: "We launched our online store, bringing Giftij Brandy to women across Nigeria and the world. Over 5,000 bags carried by women who chose themselves." },
]

export default function StoryPage() {
  return (
    <>
      <SiteNav theme="dark" />

      <section className="gb-story-hero">
        <div>
          <p className="gb-story-hero-eyebrow">Est. 2020 · Lagos, Nigeria</p>
          <h1 className="gb-story-hero-title">
            Born From a
            <br />
            Love of <span className="gb-em">Beautiful</span>
            <br />
            Things.
          </h1>
          <p className="gb-story-hero-sub">
            Every bag we make carries a piece of our founder&apos;s dream — that every Nigerian woman
            deserves to carry luxury that was made for her.
          </p>
        </div>
      </section>

      <section className="gb-story-intro">
        <div className="gb-story-img-box">
          <svg viewBox="0 0 380 475" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="475" fill="#EDE0CC" />
            <rect x="0" y="300" width="380" height="175" fill="#E3D3B8" opacity="0.6" />
            <ellipse cx="190" cy="145" rx="48" ry="55" fill="#2A1F0E" opacity="0.55" />
            <path d="M138 200 Q145 280 130 380" stroke="#2A1F0E" strokeWidth="24" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d="M242 200 Q240 280 252 380" stroke="#2A1F0E" strokeWidth="24" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d="M138 200 Q190 260 242 200" fill="#2A1F0E" opacity="0.55" />
            <rect x="245" y="255" width="80" height="62" rx="8" fill="#C9A84C" opacity="0.5" />
            <rect x="0" y="455" width="380" height="20" fill="#C9A84C" opacity="0.25" />
          </svg>
        </div>
        <div>
          <p className="gb-story-pull-quote">Our Beginning</p>
          <h2 className="gb-story-body-title">A Bag for Every Chapter of Her Life</h2>
          <p className="gb-story-body-text">
            It started with a simple frustration: luxury bags in Nigeria were either prohibitively
            expensive imports or low-quality imitations. Neither felt made for the women carrying them.
          </p>
          <p className="gb-story-body-text">
            Our founder — a woman who believed deeply in the power of beautiful, well-made things —
            decided to change that. She started with a single workshop and an uncompromising standard.
          </p>
          <p className="gb-story-body-text">
            What began as a dream in Lagos quickly became the go-to name for women who refuse to settle.
            Women who carry their success, their grace, and their story with them.
          </p>
          <div className="gb-story-sig">
            With love,
            <em>Jacobs Gift Amah</em>
            <span>— Founder &amp; Creative Director</span>
          </div>
        </div>
      </section>

      <section className="gb-values">
        <p className="gb-section-label">What We Stand For</p>
        <h2 className="gb-section-title">Our Pillars</h2>
        <div className="gb-values-grid">
          {VALUES.map((v) => (
            <div key={v.title}>
              <div className="gb-value-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="gb-value-title">{v.title}</h3>
              <p className="gb-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-timeline">
        <p className="gb-section-label">Our Journey</p>
        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>How We Got Here</h2>
        {TIMELINE.map((t) => (
          <div className="gb-timeline-item" key={t.year}>
            <p className="gb-timeline-year">{t.year}</p>
            <div>
              <h3 className="gb-timeline-title">{t.title}</h3>
              <p className="gb-timeline-text">{t.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="gb-story-intro">
        <div className="gb-story-img-box">
          <ImageOrFallback
            src="/jacobs Gift Amah.jpg"
            alt="Jacobs Gift Amah, Founder & Creative Director of Giftij Brandy"
            fallback={
              <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="400" fill="#EDE5DA" />
                <ellipse cx="150" cy="115" rx="48" ry="54" fill="#2A1F0E" opacity="0.6" />
                <path d="M98 170 Q106 265 90 380" stroke="#2A1F0E" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M202 170 Q197 265 212 380" stroke="#2A1F0E" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M98 170 Q150 230 202 170" fill="#2A1F0E" opacity="0.6" />
                <rect x="205" y="220" width="75" height="58" rx="7" fill="#C9A84C" opacity="0.55" />
                <rect x="0" y="380" width="300" height="20" fill="#C9A84C" opacity="0.2" />
              </svg>
            }
          />
        </div>
        <div>
          <p className="gb-story-pull-quote">A Word From Our Founder</p>
          <h2 className="gb-story-body-title">
            She Built This
            <br />
            For You.
          </h2>
          <p className="gb-story-body-text">
            I grew up watching my mother save for months to buy one beautiful thing. Something that made
            her stand a little taller when she walked into a room.
          </p>
          <p className="gb-story-body-text">
            Giftij Brandy isn&apos;t just a bag brand. It&apos;s proof that African luxury belongs on the
            world stage — crafted here, carried everywhere, coveted always.
          </p>
          <div className="gb-founder-blockquote">
            <p>&ldquo;A bag should tell the world who you are before you say a word. Ours say: she arrived.&rdquo;</p>
            <cite>— Jacobs Gift Amah</cite>
          </div>
          <p className="gb-story-body-text">
            Every piece we make is a love letter to the woman who carries it. That woman is you.
          </p>
        </div>
      </section>

      <section className="gb-story-cta">
        <p className="gb-section-label">Ready to Carry Your Story?</p>
        <h2 className="gb-section-title">
          Find Your
          <br />
          Signature Piece.
        </h2>
        <p className="gb-section-sub" style={{ margin: "12px auto 28px" }}>
          Every bag in our collection was made for a woman who knows what she wants. Let us help you
          find the one that was made for you.
        </p>
        <Link href="/shop" className="gb-btn">
          Shop The Collection
        </Link>
      </section>
    </>
  )
}
