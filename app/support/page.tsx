import type { Metadata } from "next"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { FaqList, type Faq } from "./faq-list"

export const metadata: Metadata = {
  title: "Help & Support — Giftij Brandy",
  description:
    "Get answers about Giftij Brandy orders, delivery across Nigeria, tracking, refunds, exchanges, and customer support.",
}

const FAQS: Faq[] = [
  {
    q: "Will I receive exactly the product I ordered?",
    a: "Yes. We send the exact product, colour, size, and style selected when you place your order. We also confirm your order details before dispatch to reduce mistakes. If there is any issue with availability, we will contact you before your order is shipped.",
  },
  {
    q: "Do you deliver outside Port Harcourt?",
    a: "Yes. Giftij Brandy delivers to customers in Port Harcourt and other locations across Nigeria.",
  },
  {
    q: "How long does delivery take outside Port Harcourt?",
    a: "Delivery time depends on your location. Orders to nearby South-South and South-East states typically arrive within about 24 hours, while deliveries to western states and farther northern locations may take up to 48 hours. Delivery times may vary slightly depending on the courier, exact destination, weekends, public holidays, or other logistics conditions.",
  },
  {
    q: "How much does delivery cost?",
    a: "Delivery cost depends on your location and the courier handling your order. The applicable delivery fee will be communicated or shown before dispatch, depending on the order process.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order has been dispatched, you can contact our support team for an update on your delivery. If a tracking reference is available for your shipment, it will be shared with you.",
  },
  {
    q: "What should I do if I receive the wrong product?",
    a: "Contact Giftij Brandy support as soon as possible with your order details and clear photos of the product you received. We will review the issue and arrange the appropriate replacement or resolution.",
  },
  {
    q: "What should I do if my product arrives damaged or defective?",
    a: "Contact our support team as soon as possible and provide clear photos or videos showing the issue. We will review the complaint and advise you on the next step.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. A refund may be issued if the product you receive is damaged, defective, incorrect, or does not meet the expected quality standard. Refund requests are reviewed based on the condition of the product and the details provided.",
  },
  {
    q: "Can I exchange an item if the size does not fit?",
    a: "Size exchanges may be available for eligible items that are unused and returned in their original condition. Contact our support team as soon as possible after delivery to confirm whether your order qualifies.",
  },
  {
    q: "How do I contact Giftij Brandy customer support?",
    a: "You can contact our customer support team through the contact options available on our Support page for help with orders, delivery, returns, exchanges, or product-related questions.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

const CARE = [
  {
    num: "I",
    title: "Clean Gently",
    text: "Use a soft, damp cloth for surface dirt. Never use harsh chemicals, alcohol wipes, or abrasive materials on the leather.",
  },
  {
    num: "II",
    title: "Condition Regularly",
    text: "Apply a leather conditioner every 3–6 months to keep the leather supple and prevent cracking. A little goes a long way.",
  },
  {
    num: "III",
    title: "Store Properly",
    text: "Always store in the dust bag provided, stuffed lightly to maintain shape. Keep away from direct sunlight and damp.",
  },
  {
    num: "IV",
    title: "Protect From Rain",
    text: "Use a leather protector spray before exposure to wet conditions. If caught in rain, blot dry with a soft cloth — never rub.",
  },
]

const TOPICS = [
  {
    title: "Orders & Products",
    desc: "Order accuracy, product issues, and what to do if something is wrong.",
  },
  {
    title: "Delivery",
    desc: "Delivery across Nigeria, estimated timelines, costs, and tracking.",
  },
  {
    title: "Returns & Refunds",
    desc: "Refunds, damaged items, wrong products, and size exchanges.",
  },
  {
    title: "Customer Support",
    desc: "How to reach Giftij Brandy when you need help with an order.",
  },
]

export default function SupportPage() {
  return (
    <>
      <SiteNav theme="light" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">We&apos;re Here For You</span>

        <span className="gb-page-title">Help &amp; Support</span>

        <span className="gb-page-sub">
          Get clear answers about orders, delivery, returns, exchanges, and support.
        </span>
      </section>

      <section className="gb-section">
        <p className="gb-section-label">Browse Topics</p>

        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>
          How Can We Help?
        </h2>

        <div className="gb-topics-grid">
          {TOPICS.map((topic) => (
            <div className="gb-topic-card" key={topic.title}>
              <h3 className="gb-topic-title">{topic.title}</h3>
              <p className="gb-topic-desc">{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-section" style={{ background: "#f7f1e7" }}>
        <p className="gb-section-label">Good to Know</p>

        <h2 className="gb-section-title" style={{ marginBottom: 24 }}>
          Frequently Asked Questions About Orders, Delivery &amp; Returns
        </h2>

        <FaqList items={FAQS} />
      </section>

      <section className="gb-section">
        <p className="gb-section-label">Keep It Beautiful</p>

        <h2 className="gb-section-title" style={{ marginBottom: 32 }}>
          Bag Care Guide
        </h2>

        <div className="gb-care-grid">
          {CARE.map((item) => (
            <div key={item.num}>
              <p className="gb-care-num">{item.num}</p>
              <h3 className="gb-care-title">{item.title}</h3>
              <p className="gb-care-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gb-story-cta">
        <p className="gb-section-label">Still Have Questions?</p>

        <h2 className="gb-section-title">We&apos;re Always Here.</h2>

        <p className="gb-section-sub" style={{ margin: "12px auto 12px" }}>
          Visit us opposite Total Look Salon, Cornerstone, Off NTA Road,
          Port Harcourt.
        </p>

        <p className="gb-section-sub" style={{ margin: "0 auto 28px" }}>
          Our team typically responds within 2 hours on WhatsApp.
          For email, expect us within 24 hours on business days.
        </p>

        <Link href="/contact" className="gb-btn gb-story-shop-btn">
          Contact Us
        </Link>
      </section>
    </>
  )
}
