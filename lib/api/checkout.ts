import { API_BASE } from "./config"
import type { CartItem } from "@/lib/cart/cart-context"

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  state?: string
  country: string
}

export interface CheckoutUnavailableItem {
  productId: string
  variantId?: string | null
  name: string
  requested: number
  available: number
  reason:
    | "OUT_OF_STOCK"
    | "INSUFFICIENT_STOCK"
}

export interface CheckoutErrorDetails {
  unavailableItems?: CheckoutUnavailableItem[]
  customerCareWhatsApp?: string | null
}

export class CheckoutApiError extends Error {
  code?: string
  details?: CheckoutErrorDetails

  constructor(
    message: string,
    code?: string,
    details?: CheckoutErrorDetails,
  ) {
    super(message)

    this.name = "CheckoutApiError"
    this.code = code
    this.details = details
  }
}

async function postJson<T>(
  url: string,
  body: unknown,
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const json = await res.json().catch(() => null)

  if (!res.ok || !json?.success) {
    const details =
      json?.error?.details ??
      json?.error?.meta ??
      json?.error?.data ??
      undefined

    throw new CheckoutApiError(
      json?.error?.message ??
        "Something went wrong. Please try again.",
      json?.error?.code,
      details,
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
  return postJson<InitializeCheckoutResult>(
    `${API_BASE}/checkout/initialize`,
    {
      email,
      shippingAddress,
      cart: items.map((item) => ({
        productSlug: item.productSlug,
        sku: item.sku ?? undefined,
        quantity: item.quantity,
      })),
    },
  )
}

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "failed"
  | "stock_unavailable"

export interface OrderStatusResult {
  status: OrderStatus
  orderNumber?: string
}

export async function getOrderStatus(
  reference: string,
): Promise<OrderStatusResult> {
  const res = await fetch(
    `${API_BASE}/orders/status?reference=${encodeURIComponent(reference)}`,
  )

  const json = await res.json().catch(() => null)

  if (!res.ok || !json?.success) {
    throw new CheckoutApiError(
      json?.error?.message ??
        "Could not check payment status.",
      json?.error?.code,
    )
  }

  return json.data as OrderStatusResult
}