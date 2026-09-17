import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { ContactForm } from "./contact-form"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/components/layout/social-links"

/** Contact — content ported from public/contact.html. */
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

      <div className="gb-contact-wrap">
        <h2 className="gb-form-title">Tell Us What You Need.</h2>
        <ContactForm />
      </div>

      <section className="gb-info-block">
        <h2 className="gb-form-title">Our Location &amp; Business Hours</h2>

        <div style={{ marginBottom: 32 }}>
          <p className="gb-info-label">Location</p>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Lagos, Nigeria</p>
          <p style={{ fontSize: 14, fontWeight: 300, color: "var(--gb-muted)" }}>
            Online-first brand · Nationwide delivery
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p className="gb-info-label">Business Hours</p>
          <div style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8 }}>
            <p><strong style={{ fontWeight: 500 }}>Monday – Friday:</strong> 9 AM – 6 PM</p>
            <p><strong style={{ fontWeight: 500 }}>Saturday:</strong> 10 AM – 4 PM</p>
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
