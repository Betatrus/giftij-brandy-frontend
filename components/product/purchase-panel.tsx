"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"
import { useCart } from "@/lib/cart/cart-context"
import type { VariantGroup } from "@/lib/api/types"

const CUSTOMER_CARE_PHONE = "09023021320"
const CUSTOMER_CARE_WHATSAPP = "2349023021320"

export function PurchasePanel({
  productSlug,
  name,
  colour,
  image,
  price,
  group,
  productInStock = true,
  offerCampaignSlug,
}: {
  productSlug: string
  name: string
  colour: string | null
  image: string
  price: number
  group: VariantGroup | null
  productInStock?: boolean
  offerCampaignSlug?: string
}) {
  const { items, addItem, updateQuantity } = useCart()

  const sizes = useMemo(
    () => group?.sizes ?? [],
    [group],
  )

  const defaultVariant = useMemo(() => {
    if (sizes.length === 0) {
      return null
    }

    return (
      sizes.find(
        (variant) =>
          variant.inStock !== false,
      ) ?? sizes[0]
    )
  }, [sizes])

  const [
    selectedSize,
    setSelectedSize,
  ] = useState<string | null>(
    defaultVariant?.size ?? null,
  )

  const [quantity, setQuantity] =
    useState(1)

  /**
   * Product-page cart editing is deliberately visit-scoped.
   *
   * Once this exact product/colour/size is added during the current
   * product-page visit, the quantity control becomes a live view of the
   * central cart item and +/- updates the real cart immediately.
   *
   * This Set is intentionally local to PurchasePanel. Leaving this page
   * unmounts it, so returning later starts a fresh product-page visit even
   * if the cart itself still exists in sessionStorage. The existing cart
   * session/inactivity behavior in CartProvider is therefore unchanged.
   */
  const [liveCartItemIds, setLiveCartItemIds] =
    useState<Set<string>>(() => new Set())

  useEffect(() => {
    setSelectedSize(
      defaultVariant?.size ?? null,
    )

    setQuantity(1)
  }, [
    group?.colorSlug,
    defaultVariant?.sku,
    defaultVariant?.size,
  ])

  const selectedVariant = useMemo(() => {
    if (sizes.length === 0) {
      return null
    }

    return (
      sizes.find(
        (variant) =>
          variant.size === selectedSize,
      ) ?? defaultVariant
    )
  }, [
    sizes,
    selectedSize,
    defaultVariant,
  ])

  const hasVariants =
    sizes.length > 0

  const unavailableSizes = useMemo(
    () =>
      sizes.filter(
        (variant) =>
          variant.inStock === false,
      ),
    [sizes],
  )

  const availableSizes = useMemo(
    () =>
      sizes.filter(
        (variant) =>
          variant.inStock !== false,
      ),
    [sizes],
  )

  const hasUnavailableSizes =
    unavailableSizes.length > 0

  const allSizesOutOfStock =
    hasVariants &&
    availableSizes.length === 0

  const isOutOfStock =
    hasVariants
      ? allSizesOutOfStock ||
        !selectedVariant ||
        selectedVariant.inStock === false
      : !productInStock

  const customerCareMessage = useMemo(() => {
    const unavailableSizeText =
      unavailableSizes
        .map((variant) => variant.size)
        .filter(Boolean)
        .join(", ")

    const details = [
      name,
      colour
        ? `Colour: ${colour}`
        : null,
      allSizesOutOfStock
        ? "All sizes are currently out of stock"
        : unavailableSizeText
          ? `Unavailable size${unavailableSizes.length === 1 ? "" : "s"}: ${unavailableSizeText}`
          : selectedVariant?.size
            ? `Size: ${selectedVariant.size}`
            : null,
    ]
      .filter(Boolean)
      .join(", ")

    return encodeURIComponent(
      `Hello Giftij Brandy, I am interested in ${details}. Please let me know about availability or available alternatives.`,
    )
  }, [
    name,
    colour,
    unavailableSizes,
    allSizesOutOfStock,
    selectedVariant?.size,
  ])

  const customerCareUrl =
    `https://wa.me/${CUSTOMER_CARE_WHATSAPP}?text=${customerCareMessage}`

  const currentItemId = useMemo(
    () =>
      `${productSlug}--${
        group?.colorSlug ?? "default"
      }--${
        selectedVariant?.sku ?? "default"
      }--offer-${offerCampaignSlug ?? "none"}`,
    [
      productSlug,
      group?.colorSlug,
      selectedVariant?.sku,
      offerCampaignSlug,
    ],
  )

  const currentCartItem = useMemo(
    () =>
      items.find(
        (item) => item.id === currentItemId,
      ) ?? null,
    [items, currentItemId],
  )

  const isLiveCartQuantity =
    liveCartItemIds.has(currentItemId) &&
    currentCartItem !== null

  const displayedQuantity =
    isLiveCartQuantity && currentCartItem
      ? currentCartItem.quantity
      : quantity

  function handleDecreaseQuantity() {
    if (isLiveCartQuantity && currentCartItem) {
      updateQuantity(
        currentItemId,
        currentCartItem.quantity - 1,
      )
      return
    }

    setQuantity((current) =>
      Math.max(1, current - 1),
    )
  }

  function handleIncreaseQuantity() {
    if (isLiveCartQuantity && currentCartItem) {
      updateQuantity(
        currentItemId,
        currentCartItem.quantity + 1,
      )
      return
    }

    setQuantity((current) => current + 1)
  }

  function handleAddToCart() {
    if (isOutOfStock) {
      return
    }

    if (
      hasVariants &&
      !selectedVariant?.sku
    ) {
      return
    }

    addItem(
      {
        id: currentItemId,

        productSlug,
        name,
        colour,

        size:
          selectedVariant?.size ?? null,

        sku:
          selectedVariant?.sku ?? null,

        price,
        image,
        offerCampaignSlug,
      },
      quantity,
    )

    setLiveCartItemIds((current) => {
      const next = new Set(current)
      next.add(currentItemId)
      return next
    })

    // Once added, +/- edits the actual cart quantity. Keep the next
    // "Add to Cart" action as a single additional unit if used again.
    setQuantity(1)
  }

  return (
    <div>
      {sizes.length > 1 && (
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <p className="gb-pdp-section-title">
            Size
          </p>

          <div className="gb-colour-list">
            {sizes.map((variant) => {
              const unavailable =
                variant.inStock === false

              return (
                <button
                  key={variant.sku}
                  type="button"
                  className="gb-colour-swatch"
                  data-active={
                    variant.size === selectedSize
                  }
                  data-out-of-stock={
                    unavailable
                  }
                  disabled={unavailable}
                  onClick={() =>
                    setSelectedSize(
                      variant.size,
                    )
                  }
                  aria-label={
                    unavailable
                      ? `Size ${variant.size ?? ""} out of stock`
                      : `Select size ${variant.size ?? ""}`
                  }
                  title={
                    unavailable
                      ? "Out of stock"
                      : undefined
                  }
                  style={
                    unavailable
                      ? {
                          opacity: 0.45,
                          cursor: "not-allowed",
                        }
                      : undefined
                  }
                >
                  {variant.size}
                </button>
              )
            })}
          </div>

          {hasUnavailableSizes &&
            !allSizesOutOfStock && (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  border:
                    "1px solid rgba(184, 139, 45, 0.28)",
                  background:
                    "rgba(184, 139, 45, 0.05)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Some sizes are currently out of stock.
                </p>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Contact customer care if you need one of the unavailable sizes.
                </p>

                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Contact customer care: {CUSTOMER_CARE_PHONE}
                </p>

                <a
                  href={customerCareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gb-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: 12,
                    textDecoration: "none",
                    background: "#d4a72c",
                    color: "#111111",
                    border: "1px solid #d4a72c",
                  }}
                >
                  Contact Customer Care
                </a>
              </div>
            )}
        </div>
      )}

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <p className="gb-pdp-section-title">
          Quantity
        </p>

        <div className="gb-qty">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>{displayedQuantity}</span>

          <button
            type="button"
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="gb-btn"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        style={{
          width: "100%",
        }}
      >
        {isOutOfStock
          ? "Out of Stock"
          : "Add to Cart"}
      </button>

      {isOutOfStock && (
        <>
          <p className="gb-pdp-stock-note">
            This selection is currently out of stock.
          </p>

          <div
            style={{
              marginTop: 18,
              padding: 20,
              border:
                "1px solid rgba(184, 139, 45, 0.35)",
              background:
                "rgba(184, 139, 45, 0.06)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Need this item?
            </p>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Contact customer care to check availability
              or available alternatives.
            </p>

            <p
              style={{
                margin: "12px 0 0",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Contact customer care: {CUSTOMER_CARE_PHONE}
            </p>

            <a
              href={customerCareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gb-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 16,
                textDecoration: "none",
                background: "#d4a72c",
                color: "#111111",
                border: "1px solid #d4a72c",
              }}
            >
              Contact Customer Care
            </a>
          </div>
        </>
      )}
    </div>
  )
}
