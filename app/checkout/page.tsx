"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"
import {
  initializeCheckout,
  CheckoutApiError,
  type CheckoutUnavailableItem,
  type ShippingAddress,
} from "@/lib/api/checkout"

function buildWhatsAppUrl(phone: string) {
  let digits = phone.replace(/\D/g, "")

  if (digits.startsWith("0")) {
    digits = `234${digits.slice(1)}`
  }

  return `https://wa.me/${digits}`
}

export default function CheckoutPage() {
  const { items, totalPrice, totalCount } = useCart()

  const [form, setForm] = useState<
    ShippingAddress & { email: string }
  >({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<string | null>(null)

  const [unavailableItems, setUnavailableItems] = useState<
    CheckoutUnavailableItem[]
  >([])

  const [customerCareWhatsApp, setCustomerCareWhatsApp] = useState<
    string | null
  >(null)

  const isOutOfStock = errorCode === "OUT_OF_STOCK"

  function update<K extends keyof typeof form>(
    key: K,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function closeStockDrawer() {
    setError(null)
    setErrorCode(null)
    setUnavailableItems([])
    setCustomerCareWhatsApp(null)
  }

  useEffect(() => {
    if (!isOutOfStock) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeStockDrawer()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOutOfStock])

  const isComplete = Boolean(
    form.email.trim() &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.phone.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.country.trim(),
  )

  async function handlePay() {
    if (!isComplete || submitting) return

    setSubmitting(true)
    setError(null)
    setErrorCode(null)
    setUnavailableItems([])
    setCustomerCareWhatsApp(null)

    try {
      const { email, ...shippingAddress } = form

      const result = await initializeCheckout(
        email,
        shippingAddress,
        items,
      )

      window.location.href = result.authorizationUrl
    } catch (err) {
      if (err instanceof CheckoutApiError) {
        setError(err.message)
        setErrorCode(err.code ?? null)

        setUnavailableItems(
          err.details?.unavailableItems ?? [],
        )

        setCustomerCareWhatsApp(
          err.details?.customerCareWhatsApp ?? null,
        )
      } else {
        setError(
          "Something went wrong processing your order. Please try again.",
        )

        setErrorCode(null)
        setUnavailableItems([])
        setCustomerCareWhatsApp(null)
      }

      setSubmitting(false)
    }
  }

  const whatsappUrl = customerCareWhatsApp
    ? buildWhatsAppUrl(customerCareWhatsApp)
    : null

  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">Almost There</span>

        <span className="gb-page-title">Checkout</span>

        <span className="gb-page-sub">
          Review your order and enter your delivery details.
        </span>
      </section>

      <main className="gb-shop-main">
        {items.length === 0 ? (
          <div className="gb-empty-state">
            <p>Your cart is empty.</p>

            <Link
              href="/shop"
              className="gb-btn"
              style={{ marginTop: 20 }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ maxWidth: 640 }}>
            <p className="gb-pdp-section-title">
              Order Summary
            </p>

            {items.map((item) => (
              <div
                key={item.id}
                className="gb-cart-row"
              >
                <div className="gb-cart-thumb">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : null}
                </div>

                <div style={{ flex: 1 }}>
                  <p className="gb-product-name">
                    {item.name}
                  </p>

                  {(item.colour || item.size) && (
                    <p className="gb-product-colour">
                      {[item.colour, item.size]
                        .filter(Boolean)
                        .join(" · ")}
                      {" · "}Qty {item.quantity}
                    </p>
                  )}

                  {!item.colour && !item.size && (
                    <p className="gb-product-colour">
                      Qty {item.quantity}
                    </p>
                  )}
                </div>

                <p className="gb-product-price">
                  {formatPrice(
                    item.price * item.quantity,
                  )}
                </p>
              </div>
            ))}

            <div className="gb-cart-total">
              <span>
                Subtotal ({totalCount} item
                {totalCount === 1 ? "" : "s"})
              </span>

              <span>
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div
              className="gb-cart-stock-message"
              style={{ marginBottom: 28 }}
            >
              <span className="gb-cart-stock-icon">
                ✓
              </span>

              <div>
                <strong>
                  Real-time stock check
                </strong>

                <p>
                  Stock availability is confirmed from the store in real time.
                </p>
              </div>
            </div>

            <p className="gb-pdp-section-title">
              Delivery Details
            </p>

            <div className="gb-form-grid">
              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-email"
                >
                  Email Address
                </label>

                <input
                  id="co-email"
                  type="email"
                  className="gb-form-input"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) =>
                    update(
                      "email",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-first-name"
                >
                  First Name
                </label>

                <input
                  id="co-first-name"
                  type="text"
                  className="gb-form-input"
                  placeholder="Adaeze"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-last-name"
                >
                  Last Name
                </label>

                <input
                  id="co-last-name"
                  type="text"
                  className="gb-form-input"
                  placeholder="Okonkwo"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-phone"
                >
                  Phone (WhatsApp)
                </label>

                <input
                  id="co-phone"
                  type="tel"
                  className="gb-form-input"
                  placeholder="09023021320"
                  value={form.phone}
                  onChange={(e) =>
                    update(
                      "phone",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-city"
                >
                  City
                </label>

                <input
                  id="co-city"
                  type="text"
                  className="gb-form-input"
                  placeholder="Lagos"
                  value={form.city}
                  onChange={(e) =>
                    update(
                      "city",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-state"
                >
                  State
                </label>

                <input
                  id="co-state"
                  type="text"
                  className="gb-form-input"
                  placeholder="Lagos State"
                  value={form.state}
                  onChange={(e) =>
                    update(
                      "state",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="gb-form-group">
                <label
                  className="gb-form-label"
                  htmlFor="co-country"
                >
                  Country
                </label>

                <input
                  id="co-country"
                  type="text"
                  className="gb-form-input"
                  value={form.country}
                  onChange={(e) =>
                    update(
                      "country",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="gb-form-group full">
                <label
                  className="gb-form-label"
                  htmlFor="co-address"
                >
                  Delivery Address
                </label>

                <textarea
                  id="co-address"
                  className="gb-form-textarea"
                  placeholder="Street address, apartment, landmark..."
                  value={form.address}
                  onChange={(e) =>
                    update(
                      "address",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            {error && !isOutOfStock && (
              <div
                className="gb-checkout-alert"
                role="alert"
                aria-live="polite"
              >
                <div className="gb-checkout-alert-icon">
                  i
                </div>

                <div className="gb-checkout-alert-content">
                  <p className="gb-checkout-alert-title">
                    We couldn&apos;t continue your checkout
                  </p>

                  <p className="gb-checkout-alert-message">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div
              className="gb-checkout-payment-note"
              style={{
                marginTop: 24,
                padding: 18,
                border: "1px solid rgba(32, 32, 32, 0.12)",
                borderRadius: 12,
                background: "#faf8f5",
                color: "#242424",
              }}
            >
              <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 15 }}>
                Payment Summary
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 8 }}>
                <span>Product price</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 8 }}>
                <span>Paystack processing fee</span>
                <strong>Added by Paystack</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, paddingTop: 10, borderTop: "1px solid rgba(32, 32, 32, 0.12)", fontWeight: 700 }}>
                <span>Total to pay</span>
                <strong>{formatPrice(totalPrice)} + processing fee</strong>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.6 }}>
                Paystack calculates and displays the applicable processing fee before you confirm payment. Nigerian local payments follow Paystack&apos;s local pricing; international card payments may attract different fees depending on the card and payment method. Once you place your order and continue to payment, we&apos;ll reserve your bag for <strong>10 minutes</strong> while you complete checkout.
              </p>
            </div>

            <button
              type="button"
              className="gb-btn gb-checkout-pay-btn"
              style={{
                width: "100%",
                minHeight: 54,
                marginTop: 24,
                fontSize: 15,
                fontWeight: 700,
              }}
              disabled={
                !isComplete ||
                submitting
              }
              onClick={handlePay}
            >
              {submitting
                ? "Placing order..."
                : "Place order"}
            </button>

            <div className="gb-checkout-back-wrap">
              <Link
                href="/cart"
                className="gb-checkout-back-link"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        )}
      </main>

      {isOutOfStock && error && (
        <div
          className="gb-stock-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gb-stock-modal-title"
        >
          <button
            type="button"
            className="gb-stock-modal-backdrop"
            aria-label="Close stock update"
            onClick={closeStockDrawer}
          />

          <section className="gb-stock-sheet">
            <div className="gb-stock-sheet-accent" />

            <button
              type="button"
              className="gb-stock-sheet-close"
              onClick={closeStockDrawer}
              aria-label="Close stock update"
            >
              ×
            </button>

            <div className="gb-stock-sheet-heading">
              <span className="gb-stock-sheet-eyebrow">
                Your Selection
              </span>

              <h2 id="gb-stock-modal-title">
                Stock Update
              </h2>

              <div className="gb-stock-sheet-status">
                <span>!</span>

                <strong>
                  Availability Changed
                </strong>
              </div>
            </div>

            <div className="gb-stock-sheet-message">
              {unavailableItems.length > 0 ? (
                unavailableItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId ?? "base"}`}
                    style={{
                      marginBottom: 12,
                    }}
                  >
                    <strong>
                      {item.name}
                    </strong>

                    {item.available <= 0 ? (
                      <p style={{ marginTop: 5 }}>
                        Out of stock.
                      </p>
                    ) : (
                      <p style={{ marginTop: 5 }}>
                        Only {item.available}{" "}
                        {item.available === 1
                          ? "unit is"
                          : "units are"}{" "}
                        currently available.
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>{error}</p>
              )}

              <p
                style={{
                  marginTop: 12,
                  fontWeight: 600,
                }}
              >
                {customerCareWhatsApp
                  ? `Contact customer care: ${customerCareWhatsApp}`
                  : "Contact customer care for assistance."}
              </p>
            </div>

            <div className="gb-stock-sheet-note">
              <span className="gb-stock-sheet-note-icon">
                ◇
              </span>

              <div>
                <strong>
                  Need help with your order?
                </strong>

                <p>
                  Our customer care team can assist you with availability,
                  alternatives and your order.
                </p>
              </div>
            </div>

            <div className="gb-stock-sheet-actions">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gb-stock-sheet-primary"
                >
                  <span>
                    Contact Customer Care
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </a>
              )}

              <Link
                href="/cart"
                className="gb-stock-sheet-secondary"
              >
                View Cart
              </Link>

              <Link
                href="/shop"
                className="gb-stock-sheet-secondary"
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  )
}