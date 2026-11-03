"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { useCart } from "@/lib/cart/cart-context"
import { getOrderStatus, type OrderStatus } from "@/lib/api/checkout"

/**
 * Where Paystack redirects the customer back to after they pay (or
 * cancel). The presence of this page loading, or of a `reference` /
 * `trxref` query param, means NOTHING about whether the payment actually
 * succeeded — that redirect is fully client-controlled and can happen
 * for a cancelled or failed charge too. The only thing this page ever
 * does is poll the backend's /orders/status endpoint and render exactly
 * what it says. The cart is only cleared once the backend says
 * "confirmed".
 */
const POLL_INTERVAL_MS = 3000
const MAX_POLL_ATTEMPTS = 40 // ~2 minutes

function CheckoutCallbackInner() {
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference") ?? searchParams.get("trxref")
  const { clear } = useCart()

  const [status, setStatus] = useState<OrderStatus | "checking" | "error">("checking")
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const attemptsRef = useRef(0)
  const clearedRef = useRef(false)

  useEffect(() => {
    if (!reference) {
      setStatus("error")
      return
    }

    let cancelled = false

    async function poll() {
      try {
        const result = await getOrderStatus(reference!)
        if (cancelled) return

        if (result.status === "confirmed") {
          setStatus("confirmed")
          setOrderNumber(result.orderNumber ?? null)
          if (!clearedRef.current) {
            clearedRef.current = true
            clear()
          }
          return
        }

        if (result.status === "failed") {
          setStatus("failed")
          return
        }

        attemptsRef.current += 1
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setStatus("processing")
          return
        }

        setStatus("processing")
        setTimeout(poll, POLL_INTERVAL_MS)
      } catch {
        if (!cancelled) setStatus("error")
      }
    }

    poll()
    return () => {
      cancelled = true
    }
  }, [reference, clear])

  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">Order Status</span>
        <span className="gb-page-title">
          {status === "confirmed" ? "Payment Successful" : "Confirming Your Payment"}
        </span>
      </section>

      <main className="gb-shop-main">
        <div className="gb-empty-state" style={{ maxWidth: 560, margin: "0 auto" }}>
          {(status === "checking" || status === "processing") && (
            <>
              <p>We&apos;re confirming your payment with Paystack — this usually takes a few seconds.</p>
              <p className="gb-form-note">Please don&apos;t close this page.</p>
            </>
          )}

          {status === "confirmed" && (
            <>
              <p>Thank you! Your payment was successful. Your order has been recorded.</p>
              {orderNumber && (
                <p className="gb-product-name" style={{ marginTop: 8 }}>Order #{orderNumber}</p>
              )}
              <Link href="/shop" className="gb-btn" style={{ marginTop: 20 }}>
                Continue Shopping
              </Link>
            </>
          )}

          {status === "failed" && (
            <>
              <p>Your payment wasn&apos;t completed, so no order was placed.</p>
              <Link href="/checkout" className="gb-btn" style={{ marginTop: 20 }}>
                Return to Checkout
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <p>
                We couldn&apos;t confirm your payment status right now. If you were charged, your order
                will still be recorded — please contact us on WhatsApp with your reference and we&apos;ll
                confirm it for you.
              </p>
              {reference && <p className="gb-form-note">Reference: {reference}</p>}
              <Link href="/shop" className="gb-btn" style={{ marginTop: 20 }}>
                Back to Shop
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default function CheckoutCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutCallbackInner />
    </Suspense>
  )
}
