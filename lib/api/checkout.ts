import { API_BASE } from "./config"
import type { CartItem } from "@/lib/cart/cart-context"

/**
 * Checkout / payment — talks to the admin backend's
 * /checkout/initialize and /orders/status endpoints only. This module
 * never touches Paystack directly and never holds a secret key; the
 * storefront's only job is to redirect the customer to the
 * `authorizationUrl` Paystack (via the backend) hands back, then poll
 * for the backend's own authoritative confirmation once Paystack sends
 * them back. See ApiError handling below — a rejected/out-of-stock cart
 * line is a normal, expected outcome here, not a bug.
 */

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  state?: string
  country: string
}

export class CheckoutApiError extends Error {
  code?: string
  constructor(message: string, code?: string) {
    super(message)
    this.code = code
  }
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => null)

  if (!res.ok || !json?.success) {
    throw new CheckoutApiError(
      json?.error?.message ?? "Something went wrong. Please try again.",
      json?.error?.code,
    )
  }

  return json.data as T
}

export interface InitializeCheckoutResult {
  authorizationUrl: string
  accessCode: string
  reference: string
}

export async function initializeCheckout(
  email: string,
  shippingAddress: ShippingAddress,
  items: CartItem[],
): Promise<InitializeCheckoutResult> {
  return postJson<InitializeCheckoutResult>(`${API_BASE}/checkout/initialize`, {
    email,
    shippingAddress,
    cart: items.map((item) => ({
      productSlug: item.productSlug,
      sku: item.sku ?? undefined,
      quantity: item.quantity,
    })),
  })
}

export type OrderStatus = "confirmed" | "processing" | "failed"

export interface OrderStatusResult {
  status: OrderStatus
  orderNumber?: string
}

export async function getOrderStatus(reference: string): Promise<OrderStatusResult> {
  const res = await fetch(`${API_BASE}/orders/status?reference=${encodeURIComponent(reference)}`)
  const json = await res.json().catch(() => null)

  if (!res.ok || !json?.success) {
    throw new CheckoutApiError(json?.error?.message ?? "Could not check payment status.")
  }

  return json.data as OrderStatusResult
}
