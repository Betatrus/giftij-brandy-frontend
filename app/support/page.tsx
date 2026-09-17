import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { FaqList, type Faq } from "./faq-list"

/** Help & Support — content ported from public/support.html. */
export const metadata: Metadata = { title: "Help & Support — Giftij Brandy" }

const FAQS: Faq[] = [
  { q: "How long does delivery take within Nigeria?", a: "Lagos orders typically arrive within 1–2 business days. Orders to other Nigerian states take 2–5 business days depending on location. You'll receive a tracking link via WhatsApp and email as soon as your order is dispatched." },
  { q: "Do you ship internationally?", a: "Yes! We ship to the UK, US, Canada, and select European countries. International shipping takes 7–14 business days. Customs fees and import duties are the responsibility of the customer and vary by country." },
  { q: "How do I track my order?", a: "Once your order ships, you'll get a tracking number via WhatsApp and email. If you haven't received your tracking details within 24 hours of dispatch, reach out to us and we'll sort it immediately." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for items in original, unused condition with all tags attached. Custom or personalised pieces are non-returnable. Contact us via WhatsApp to initiate a return and we'll guide you through the process." },
  { q: "How do exchanges work?", a: "Want a different colour or style? We offer free exchanges within 14 days. Simply return your item and let us know what you'd like instead. If there's a price difference, we'll sort the balance via transfer or refund." },
  { q: "Are your bags made from real leather?", a: "Absolutely. All Giftij Brandy bags use full-grain or pebbled genuine leather. We list the exact leather type and origin on each product page. We never use bonded leather or PU — you're getting the real thing, every time." },
  { q: "Do the bags come with a dust bag and authenticity card?", a: "Yes! Every bag arrives in our signature gold-and-black gift box, with a branded dust bag, gold authenticity card, and care guide card. It's gift-ready right out of the box." },
  { q: "What payment methods do you accept?", a: "We accept card payments (Mastercard, Visa), bank transfers, and payments via Paystack. For international orders, we also accept PayPal. All transactions are secured with SSL encryption." },
  { q: "Can I pay in instalments?", a: "Yes! We offer a layaway plan for orders above ₦100,000. Pay 50% upfront and the balance before dispatch. Contact us on WhatsApp to set this up — we'll hold your item for up to 14 days." },
]

const CARE = [
  { num: "I", title: "Clean Gently", text: "Use a soft, damp cloth for surface dirt. Never use harsh chemicals, alcohol wipes, or abrasive materials on the leather." },
  { num: "II", title: "Condition Regularly", text: "Apply a leather conditioner every 3–6 months to keep the leather supple and prevent cracking. A little goes a long way." },
  { num: "III", title: "Store Properly", text: "Always store in the dust bag provided, stuffed lightly to maintain shape. Keep away from direct sunlight and damp." },
  { num: "IV", title: "Protect From Rain", text: "Use a leather protector spray before exposure to wet conditions. If caught in rain, blot dry with a soft cloth — never rub." },
]

const TOPICS = [
  { title: "Orders & Shipping", desc: "Delivery times, tracking, and dispatch." },
  { title: "Returns & Exchanges", desc: "Our 14-day policy, explained simply." },
  { title: "Bag Care Guide", desc: "Keep your leather beautiful for years." },
  { title: "Payments", desc: "Cards, transfers, Paystack and layaway." },
]

export default function SupportPage() {
  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">We&apos;re Here For You</span>
        <span className="gb-page-title">Help &amp; Support</span>
        <span className="gb-page-sub">Find answers, track orders, and get the care your bag deserves.</span>
      </section>

      <section className="gb-section">
        <p className="gb-section-label">Browse Topics</p>
        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>How Can We Help?</h2>
        <div className="gb-topics-grid">
          {TOPICS.map((t) => (
            <div className="gb-topic-card" key={t.title}>
              <h3 className="gb-topic-title">{t.title}</h3>
              <p className="gb-topic-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-section" style={{ background: "#f7f1e7" }}>
        <p className="gb-section-label">Good to Know</p>
        <h2 className="gb-section-title" style={{ marginBottom: 24 }}>Frequently Asked</h2>
        <FaqList items={FAQS} />
      </section>

      <section className="gb-section">
        <p className="gb-section-label">Keep It Beautiful</p>
        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>Bag Care Guide</h2>
        <div className="gb-care-grid">
          {CARE.map((c) => (
            <div key={c.num}>
              <p className="gb-care-num">{c.num}</p>
              <h3 className="gb-care-title">{c.title}</h3>
              <p className="gb-care-text">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-story-cta">
        <p className="gb-section-label">Still Have Questions?</p>
        <h2 className="gb-section-title">We&apos;re Always Here.</h2>
        <p className="gb-section-sub" style={{ margin: "12px auto 28px" }}>
          Our team typically responds within 2 hours on WhatsApp. For email, expect us within 24 hours
          on business days.
        </p>
        <Link href="/contact" className="gb-btn">
          Contact Us
        </Link>
      </section>
    </>
  )
}
