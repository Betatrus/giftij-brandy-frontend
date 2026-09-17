const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount)
}

/**
 * Returns the discounted price to display.
 *
 * Prefers the backend's own authoritative `discountedPrice` (the real
 * charged price, confirmed to exist in the actual DTO) when present.
 * Falls back to computing it from `price`/`discount` only if the API
 * didn't supply one — a defensive fallback, not the primary path, since
 * the backend's rounding/business rules are the source of truth.
 */
export function getDiscountedPrice(
  price: number,
  discount?: number | null,
  authoritative?: number | null,
): number | null {
  // Only treat the authoritative value as a real discount if it's
  // actually lower than price — a product with no discount reports
  // discountedPrice === price (e.g. the real "king" product: discount 0,
  // discountedPrice 1000, price 1000), which must render as "no
  // discount", not a redundant "was ₦1000, now ₦1000" strikethrough.
  if (authoritative != null && authoritative < price) return authoritative
  if (authoritative != null) return null
  if (!discount || discount <= 0) return null
  return Math.round(price * (1 - discount / 100))
}
