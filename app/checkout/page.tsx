"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"
import { initializeCheckout, CheckoutApiError, type ShippingAddress } from "@/lib/api/checkout"

/**
 * Checkout — collects shipping details, then hands off to the admin
 * backend's /checkout/initialize endpoint, which is the only thing that
 * talks to Paystack (see lib/api/checkout.ts). This page NEVER declares
 * a purchase successful itself: it only ever redirects the customer to
 * Paystack's own hosted payment page. Confirmation happens on
 * /checkout/callback, which polls the backend for the real, final
 * answer.
 */
export default function CheckoutPage() {
  const { items, totalPrice, totalCount } = useCart()
  const [form, setForm] = useState<ShippingAddress & { email: string }>({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const isComplete =
    form.email.trim() &&
    form.fullName.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.country.trim()

  async function handlePay() {
    if (!isComplete || submitting) return
    setSubmitting(true)
    setError(null)

    try {
      const { email, ...shippingAddress } = form
      const result = await initializeCheckout(email, shippingAddress, items)
      // Hand off to Paystack's own hosted page — this is the ONLY place
      // payment actually happens. We do not collect card details here.
      window.location.href = result.authorizationUrl
    } catch (err) {
      setError(
        err instanceof CheckoutApiError
          ? err.message
          : "Something went wrong starting your payment. Please try again.",
      )
      setSubmitting(false)
    }
  }

  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">Almost There</span>
        <span className="gb-page-title">Checkout</span>
        <span className="gb-page-sub">Review your order and enter your delivery details.</span>
      </section>

      <main className="gb-shop-main">
        {items.length === 0 ? (
          <div className="gb-empty-state">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="gb-btn" style={{ marginTop: 20 }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ maxWidth: 640 }}>
            <p className="gb-pdp-section-title">Order Summary</p>
            {items.map((item) => (
              <div key={item.id} className="gb-cart-row">
                <div className="gb-cart-thumb">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="gb-product-name">{item.name}</p>
                  {item.colour && (
                    <p className="gb-product-colour">
                      {item.colour}
                      {item.size ? ` · ${item.size}` : ""} · Qty {item.quantity}
                    </p>
                  )}
                </div>
                <p className="gb-product-price">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}

            <div className="gb-cart-total">
              <span>Subtotal ({totalCount} item{totalCount === 1 ? "" : "s"})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <p className="gb-form-note" style={{ marginTop: -8, marginBottom: 24 }}>
              Final pricing and stock are re-confirmed by the backend the moment you pay — this total
              can only go down if something changed, never be silently added to.
            </p>

            <p className="gb-pdp-section-title">Delivery Details</p>
            <div className="gb-form-grid">
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-email">Email Address</label>
                <input
                  id="co-email"
                  type="email"
                  className="gb-form-input"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-name">Full Name</label>
                <input
                  id="co-name"
                  type="text"
                  className="gb-form-input"
                  placeholder="Adaeze Okonkwo"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </div>
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-phone">Phone (WhatsApp)</label>
                <input
                  id="co-phone"
                  type="tel"
                  className="gb-form-input"
                  placeholder="09023021320"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-city">City</label>
                <input
                  id="co-city"
                  type="text"
                  className="gb-form-input"
                  placeholder="Lagos"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-state">State</label>
                <input
                  id="co-state"
                  type="text"
                  className="gb-form-input"
                  placeholder="Lagos State"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                />
              </div>
              <div className="gb-form-group">
                <label className="gb-form-label" htmlFor="co-country">Country</label>
                <input
                  id="co-country"
                  type="text"
                  className="gb-form-input"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </div>
              <div className="gb-form-group full">
                <label className="gb-form-label" htmlFor="co-address">Delivery Address</label>
                <textarea
                  id="co-address"
                  className="gb-form-textarea"
                  placeholder="Street address, apartment, landmark..."
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="gb-pdp-stock-note" style={{ marginTop: 16 }}>
                {error}
              </p>
            )}

            <button
              className="gb-btn"
              style={{ width: "100%", marginTop: 24 }}
              disabled={!isComplete || submitting}
              onClick={handlePay}
            >
              {submitting ? "Starting Payment..." : `Pay ${formatPrice(totalPrice)}`}
            </button>
            <p className="gb-form-note">
              You&apos;ll be redirected to Paystack&apos;s secure payment page to complete your purchase.
            </p>
            <Link href="/cart" className="gb-btn gb-btn-outline" style={{ marginTop: 16 }}>
              Back to Cart
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
