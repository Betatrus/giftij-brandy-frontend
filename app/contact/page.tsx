import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/components/layout/social-links"

export const metadata: Metadata = { title: "Contact — Giftij Brandy" }

export default function ContactPage() {
  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">Get In Touch</span>
        <span className="gb-page-title">
          Contact <span className="gb-em">Us</span>
        </span>
        <span className="gb-page-sub">
          Have a question or need assistance? We&apos;re here to help you look and feel your best.
        </span>
      </section>

      <section className="gb-info-block gb-contact-gold-card">
        <h2 className="gb-form-title">Shop Location &amp; Business Hours</h2>

        <div style={{ marginBottom: 32 }}>
          <p className="gb-info-label">Shop Location</p>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Port Harcourt, Nigeria</p>
          <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.7 }}>
            Opposite Total Look Salon, Cornerstone, Off NTA Road, Port Harcourt.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p className="gb-info-label">Business Hours</p>
          <div style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8 }}>
            <p><strong style={{ fontWeight: 500 }}>Monday – Saturday:</strong> 7 AM – 7 PM</p>
            <p><strong style={{ fontWeight: 500 }}>Sunday:</strong> Closed</p>
          </div>
        </div>

        <div>
          <p className="gb-info-label">Reach Us Directly</p>
          <p style={{ fontSize: 14, lineHeight: 2 }}>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp: 0902 302 1320
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
