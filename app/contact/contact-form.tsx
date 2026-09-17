"use client"

import { useState } from "react"

/**
 * Contact form, ported from public/contact.html.
 * The original submitted nothing to a backend either — it simply
 * showed a success state. That behaviour is preserved until a
 * real contact endpoint exists on the Admin API.
 */
const SUBJECTS = [
  "Order Enquiry",
  "Custom / Bespoke Order",
  "Return or Exchange",
  "Styling Advice",
  "Wholesale / Partnership",
  "General Question",
]

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="gb-empty-state">
        <h3 className="gb-story-body-title">Message Received</h3>
        <p>Thank you for reaching out. We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="gb-form-grid">
        <div className="gb-form-group">
          <label className="gb-form-label" htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" className="gb-form-input" placeholder="Adaeze" />
        </div>
        <div className="gb-form-group">
          <label className="gb-form-label" htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" className="gb-form-input" placeholder="Okonkwo" />
        </div>
        <div className="gb-form-group">
          <label className="gb-form-label" htmlFor="email">Email Address</label>
          <input id="email" type="email" className="gb-form-input" placeholder="you@email.com" />
        </div>
        <div className="gb-form-group">
          <label className="gb-form-label" htmlFor="phone">Phone (WhatsApp)</label>
          <input id="phone" type="tel" className="gb-form-input" placeholder="09023021320" />
        </div>
        <div className="gb-form-group full">
          <label className="gb-form-label" htmlFor="subject">Subject</label>
          <select id="subject" className="gb-form-select" defaultValue="">
            <option value="" disabled>Select a topic</option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="gb-form-group full">
          <label className="gb-form-label" htmlFor="message">Your Message</label>
          <textarea id="message" className="gb-form-textarea" placeholder="Tell us what's on your mind..." />
        </div>
      </div>

      <button className="gb-btn" style={{ marginTop: 24, width: "100%" }} onClick={() => setSent(true)}>
        Send Message
      </button>
      <p className="gb-form-note">We typically respond within 2 hours on WhatsApp, 24 hours via email.</p>
    </div>
  )
}
