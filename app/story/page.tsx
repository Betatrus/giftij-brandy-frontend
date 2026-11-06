import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { ImageOrFallback } from "@/components/ui/image-or-fallback"
import { pageMetadata, absoluteUrl, SITE_URL } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"

/** Our Story — Giftij Brandy founder story. */
export const metadata: Metadata = pageMetadata({
  title: "Our Story – Nigerian Fashion Brand",
  description: "Meet the founder of Giftij Brandy and discover how a Port Harcourt fashion business grew from a student startup into a Nigerian bags, shoes and slippers brand.",
  path: "/story",
})

const VALUES = [
  { title: "Craftsmanship", desc: "Every piece is selected with intention because the details matter." },
  { title: "Made for Her", desc: "Fashion that helps women feel comfortable, confident, and ready to show up as themselves." },
  { title: "Consistency", desc: "Giftij Brandy was built by showing up, learning, and taking the next step even when it was difficult." },
  { title: "Community First", desc: "Our customers have been part of this journey from the beginning. As we grow, we grow with them." },
]

const JOURNEY = [
  {
    step: "01",
    title: "The First ₦70,000",
    text: "As a final-year student with ₦100,000 in savings, our founder invested ₦70,000 into what would become Giftij Brandy.",
  },
  {
    step: "02",
    title: "The First Customers",
    text: "Starting within a student community meant beginning small. Every restock was carefully considered, but the products kept selling out.",
  },
  {
    step: "03",
    title: "Showing Up Consistently",
    text: "Growth did not happen overnight. It came from putting the brand out there, listening to customers, and showing up consistently, even on difficult days.",
  },
  {
    step: "04",
    title: "The Brand Today",
    text: "Giftij Brandy continues to grow with visible results, serving women beyond the community where the journey began while staying true to the persistence that built it.",
  },
]

const founderImage = "/jacobs-gift-amah.jpg"

export default function StoryPage() {
  const founderFallback = (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="400" fill="#EDE5DA" />
      <ellipse cx="150" cy="115" rx="48" ry="54" fill="#2A1F0E" opacity="0.6" />
      <path d="M98 170 Q106 265 90 380" stroke="#2A1F0E" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M202 170 Q197 265 212 380" stroke="#2A1F0E" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M98 170 Q150 230 202 170" fill="#2A1F0E" opacity="0.6" />
      <rect x="205" y="220" width="75" height="58" rx="7" fill="#C9A84C" opacity="0.55" />
      <rect x="0" y="380" width="300" height="20" fill="#C9A84C" opacity="0.2" />
    </svg>
  )

  return (
    <>
      <SiteNav theme="dark" />

      <section className="gb-story-hero">
        <div>
          <p className="gb-story-hero-eyebrow">Port Harcourt, Nigeria</p>
          <h1 className="gb-story-hero-title">
            Built From
            <br />
            <span className="gb-em">Courage.</span>
            <br />
            Grown With Consistency.
          </h1>
          <p className="gb-story-hero-sub">
            Giftij Brandy started as one final-year student&apos;s decision to survive. Today, it is a
            growing brand built on courage, consistency, and the women who continue to choose us.
          </p>
        </div>
      </section>

      <section className="gb-story-intro">
        <div className="gb-story-img-box">
          <ImageOrFallback
            src={founderImage}
            alt="Jacobs Gift Amah, Founder & Creative Director of Giftij Brandy"
            fallback={founderFallback}
          />
        </div>

        <div>
          <p className="gb-story-pull-quote">Our Beginning</p>
          <h2 className="gb-story-body-title">
            It Didn&apos;t Start With Passion.
            <br />
            It Started With Survival.
          </h2>

          <p className="gb-story-body-text">
            Giftij Brandy wasn&apos;t born from a lifelong passion for fashion. It began with a need to survive.
          </p>

          <p className="gb-story-body-text">
            In my final year as a student, I took ₦70,000 from the ₦100,000 I had saved and used it to
            start the business. I was afraid of losing what little I had, so I bought only a few pieces
            at a time.
          </p>

          <p className="gb-story-body-text">
            But something kept happening. Each time I restocked, I sold out. My first customers were
            mostly fellow students. What started as a small attempt to support myself slowly became
            something people genuinely wanted.
          </p>

          <p className="gb-story-body-text">
            So I kept going, one restock, one customer, and one step at a time.
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
        <h2 className="gb-section-title">What Still Guides Us</h2>

        <div className="gb-values-grid">
          {VALUES.map((value) => (
            <div key={value.title}>
              <div className="gb-value-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="gb-value-title">{value.title}</h3>
              <p className="gb-value-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-timeline">
        <p className="gb-section-label">Our Journey</p>
        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>
          Built One Step at a Time
        </h2>

        {JOURNEY.map((item) => (
          <div className="gb-timeline-item" key={item.step}>
            <p className="gb-timeline-year">{item.step}</p>
            <div>
              <h3 className="gb-timeline-title">{item.title}</h3>
              <p className="gb-timeline-text">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="founder" className="gb-story-intro">
        <div className="gb-story-img-box">
          <ImageOrFallback
            src={founderImage}
            alt="Jacobs Gift Amah, Founder & Creative Director of Giftij Brandy"
            fallback={founderFallback}
          />
        </div>

        <div>
          <p className="gb-story-pull-quote">A Word From Our Founder</p>
          <h2 className="gb-story-body-title">
            She Built This.
            <br />
            Now She Wants You to Show Up Too.
          </h2>

          <p className="gb-story-body-text">
            As Giftij Brandy grew, so did my understanding of what fashion can mean to a woman.
          </p>

          <p className="gb-story-body-text">
            I have seen how the right piece can change the way a woman carries herself. It isn&apos;t
            simply about what you wear or the bag you carry. It&apos;s about feeling comfortable in who
            you are and confident enough to show up fully.
          </p>

          <p className="gb-story-body-text">
            I want women to walk into important rooms, everyday moments, and global spaces feeling like
            they belong there. To show up. To be remembered. To leave an impression.
          </p>

          <div className="gb-founder-blockquote">
            <p>
              &ldquo;The confidence to arrive as yourself and leave a memory behind.&rdquo;
            </p>
            <cite>- Jacobs Gift Amah</cite>
          </div>

          <p className="gb-story-body-text">
            That is what I want every Giftij Brandy piece to represent.
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
          Find the piece that helps you show up with confidence, wherever you&apos;re going next.
        </p>
        <Link href="/shop" className="gb-btn gb-story-shop-btn">
          Shop The Collection
        </Link>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/story#founder`,
        name: "Jacobs Gift Amah",
        jobTitle: "Founder & Creative Director",
        url: absoluteUrl("/story#founder"),
        image: absoluteUrl(founderImage),
        worksFor: { "@id": `${SITE_URL}/#store` },
      }} />
    </>
  )
}
