import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/components/layout/social-links"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact Giftij Brandy | Port Harcourt, Nigeria",
  description: "Contact Giftij Brandy for product enquiries and online orders. Find our store in Port Harcourt, Rivers State, Nigeria, or reach us on WhatsApp.",
  path: "/contact",
})

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
          Have a question or need assistance? We&apos;re here to help you
          look and feel your best.
        </span>
      </section>

      <section className="gb-contact-details">
        <div className="gb-contact-details-header">
          <p className="gb-section-label">Visit Or Reach Us</p>

          <h2 className="gb-section-title">
            Shop Location &amp; Business Hours
          </h2>

          <p className="gb-section-sub">
            Visit our Port Harcourt store or reach out during business hours.
            Our team is available to assist with orders, product enquiries,
            and general support.
          </p>
        </div>

        <div className="gb-contact-details-grid">
          <article className="gb-contact-detail-card">
            <p className="gb-contact-detail-label">Shop Location</p>

            <h3 className="gb-contact-detail-title">
              Port Harcourt, Nigeria
            </h3>

            <p className="gb-contact-detail-text">
              Opposite Total Look Salon, Cornerstone, Off NTA Road,
              Port Harcourt.
            </p>
          </article>

          <article className="gb-contact-detail-card">
            <p className="gb-contact-detail-label">Business Hours</p>

            <div className="gb-contact-hours-row">
              <div>
                <h3 className="gb-contact-detail-title">
                  Monday - Saturday
                </h3>

                <p className="gb-contact-detail-text">
                  7 AM - 7 PM
                </p>
              </div>
            </div>

            <div className="gb-contact-detail-divider" />

            <div className="gb-contact-hours-row">
              <div>
                <h3 className="gb-contact-detail-subtitle">
                  Sunday
                </h3>

                <p className="gb-contact-detail-text">
                  Closed
                </p>
              </div>
            </div>
          </article>

          <article className="gb-contact-detail-card gb-contact-detail-card-wide">
            <p className="gb-contact-detail-label">Reach Us Directly</p>

            <div className="gb-contact-direct-links">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="gb-contact-direct-link"
              >
                <span>Email</span>
                <strong>{CONTACT_EMAIL}</strong>
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="gb-contact-direct-link"
              >
                <span>WhatsApp</span>
                <strong>0902 302 1320</strong>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}