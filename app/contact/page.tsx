import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/components/layout/social-links"
import { FaqList, type Faq } from "@/app/support/faq-list"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact & Support in Port Harcourt, Nigeria",
  description: "Contact Giftij Brandy for product enquiries and order assistance. Find answers about delivery, payments, returns and exchanges, or reach our Port Harcourt team.",
  path: "/contact",
})

const FAQS: Faq[] = [
  {
    q: "Will I receive exactly the product I ordered?",
    a: "We aim to dispatch the exact product, colour, size and style selected in your order. Order details are checked before dispatch. If an availability issue arises, our team will contact you to discuss the next step.",
  },
  {
    q: "Do you deliver outside Port Harcourt?",
    a: "Yes. Giftij Brandy delivers to customers in Port Harcourt and other locations across Nigeria. Contact us with your destination if you would like to confirm delivery arrangements before ordering.",
  },
  {
    q: "How long does delivery take outside Port Harcourt?",
    a: "Delivery time depends on your destination and the courier. As a general estimate, some nearby South-South and South-East destinations may take around 24 hours, while western states and farther northern locations may take up to 48 hours. These are estimates, not guaranteed delivery windows; weekends, public holidays and logistics conditions can affect timing. Please confirm the current estimate with our team before dispatch.",
  },
  {
    q: "How much does delivery cost?",
    a: "Delivery cost depends on your location and the courier handling your order. Our team will communicate the applicable delivery fee before dispatch.",
  },
  {
    q: "How can I track my order?",
    a: "After dispatch, contact our support team for a delivery update. If a tracking reference is available for your shipment, we will share it with you.",
  },
  {
    q: "What should I do if I receive the wrong product?",
    a: "Contact Giftij Brandy as soon as possible with your order details and clear photos of the item received. We will review the issue and get back to you about the appropriate resolution.",
  },
  {
    q: "What should I do if my product arrives damaged or defective?",
    a: "Contact our team as soon as possible and provide clear photos or videos showing the issue, along with your order details. We will review the complaint and advise you on the next step.",
  },
  {
    q: "Do you offer refunds?",
    a: "If an item arrives damaged, defective or incorrect, contact our team with your order details and supporting photos. Refund requests are reviewed based on the issue and the condition of the item. Please speak with us before sending an item back so we can explain the next steps.",
  },
  {
    q: "Can I exchange an item if the size does not fit?",
    a: "An exchange may be considered for eligible items that are unused and in their original condition. Contact our team as soon as possible after delivery so we can review your order and confirm the available options.",
  },
  {
    q: "How do I contact Giftij Brandy customer support?",
    a: "You can reach us by WhatsApp or email using the contact details on this page. Please include your order number when asking for help with an existing order.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const CARE = [
  {
    num: "I",
    title: "Clean Gently",
    text: "Start with the care instructions supplied with your item. For loose surface dust, use a soft, clean cloth. Avoid harsh chemicals, solvents or excess water unless the material's care guidance says they are suitable.",
  },
  {
    num: "II",
    title: "Use Material-Suitable Products",
    text: "Leather, faux leather, suede, fabric and other finishes can require different care. Do not apply leather conditioner, protector sprays or cleaning products unless they are specifically suitable for that item's material.",
  },
  {
    num: "III",
    title: "Dry and Store Carefully",
    text: "If an item becomes damp, gently remove surface moisture and let it air-dry away from direct heat. Store bags with light support to help maintain their shape, in a clean, dry place.",
  },
  {
    num: "IV",
    title: "Check Before Treating Stains",
    text: "Test any suitable care product on a small, hidden area first. If you are unsure about the material or the right cleaning method, ask the product maker or a professional cleaner before treating it.",
  },
]

export default function ContactPage() {
  return (
    <>
      <SiteNav theme="light" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">We&apos;re Here For You</span>
        <h1 className="gb-page-title">
          Contact <span className="gb-em">&amp; Support</span>
        </h1>
        <p className="gb-page-sub">
          Get in touch with our team or find clear answers about orders,
          delivery, payments, returns and product care.
        </p>
      </section>

      <section className="gb-contact-details">
        <div className="gb-contact-details-header">
          <p className="gb-section-label">Visit Or Reach Us</p>
          <h2 className="gb-section-title">Shop Location &amp; Business Hours</h2>
          <p className="gb-section-sub">
            Visit our Port Harcourt store or reach out during business hours.
            Our team can assist with orders, product enquiries and delivery questions.
          </p>
        </div>

        <div className="gb-contact-details-grid">
          <article className="gb-contact-detail-card">
            <p className="gb-contact-detail-label">Shop Location</p>
            <h3 className="gb-contact-detail-title">Port Harcourt, Nigeria</h3>
            <p className="gb-contact-detail-text">
              Opposite Total Look Salon, Cornerstone, Off NTA Road, Port Harcourt.
            </p>
          </article>

          <article className="gb-contact-detail-card">
            <p className="gb-contact-detail-label">Business Hours</p>
            <div className="gb-contact-hours-row">
              <div>
                <h3 className="gb-contact-detail-title">Monday - Saturday</h3>
                <p className="gb-contact-detail-text">7 AM - 7 PM</p>
              </div>
            </div>
            <div className="gb-contact-detail-divider" />
            <div className="gb-contact-hours-row">
              <div>
                <h3 className="gb-contact-detail-subtitle">Sunday</h3>
                <p className="gb-contact-detail-text">Closed</p>
              </div>
            </div>
          </article>

          <article className="gb-contact-detail-card gb-contact-detail-card-wide">
            <p className="gb-contact-detail-label">Reach Us Directly</p>
            <div className="gb-contact-direct-links">
              <a href={`mailto:${CONTACT_EMAIL}`} className="gb-contact-direct-link">
                <span>Email</span>
                <strong>{CONTACT_EMAIL}</strong>
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="gb-contact-direct-link">
                <span>WhatsApp</span>
                <strong>0902 302 1320</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="gb-section gb-contact-faq-section">
        <div className="gb-contact-content-wrap">
          <p className="gb-section-label">Help Centre</p>
          <h2 className="gb-section-title">Frequently Asked Questions</h2>
          <p className="gb-section-sub gb-contact-intro">
            Find answers to common questions about shopping with Giftij Brandy.
            If you need help with a specific order, contact us directly.
          </p>
          <FaqList items={FAQS} />
        </div>
      </section>

      <section className="gb-section gb-contact-care-section">
        <div className="gb-contact-content-wrap">
          <p className="gb-section-label">Keep It Beautiful</p>
          <h2 className="gb-section-title">Simple Bag &amp; Shoe Care</h2>
          <p className="gb-section-sub gb-contact-intro">
            Care depends on the material and finish. These general habits are a
            safe starting point; always follow the care guidance for your item.
          </p>
          <div className="gb-care-grid">
            {CARE.map((item) => (
              <article key={item.num}>
                <p className="gb-care-num">{item.num}</p>
                <h3 className="gb-care-title">{item.title}</h3>
                <p className="gb-care-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gb-story-cta gb-support-contact-cta">
        <p className="gb-section-label">Need Personal Assistance?</p>
        <h2 className="gb-section-title">We&apos;re Here to Help.</h2>
        <p className="gb-section-sub" style={{ margin: "12px auto 28px" }}>
          Message us on WhatsApp for order updates, product enquiries or support.
        </p>
        <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="gb-btn gb-story-shop-btn">
          Chat With Us
        </a>
      </section>
    </>
  )
}
