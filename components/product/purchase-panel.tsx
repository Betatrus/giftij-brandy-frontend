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
}: {
  productSlug: string
  name: string
  colour: string | null
  image: string
  price: number
  group: VariantGroup | null
  productInStock?: boolean
}) {
  const { addItem } = useCart()

  const sizes = useMemo(
    () => group?.sizes ?? [],
    [group],
  )

  /**
   * Prefer the first variant that is actually available.
   *
   * This matters especially for Shoes and Slippers where a colour can
   * contain multiple size/SKU combinations and some sizes may have
   * zero stock.
   */
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
   * When the customer changes colour, reset the selected size to the
   * first available variant belonging to that colour.
   */
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

  const selectedVariant =
    useMemo(() => {
      if (sizes.length === 0) {
        return null
      }

      return (
        sizes.find(
          (variant) =>
            variant.size ===
            selectedSize,
        ) ?? defaultVariant
      )
    }, [
      sizes,
      selectedSize,
      defaultVariant,
    ])

  /**
   * Variant products use exact SKU stock.
   *
   * Non-variant products use product-level stock.
   */
  const hasVariants =
    sizes.length > 0

  const isOutOfStock =
    hasVariants
      ? !selectedVariant ||
        selectedVariant.inStock ===
          false
      : !productInStock

  /**
   * Build a useful WhatsApp message automatically so customer care knows
   * exactly which product/colour/size the customer is asking about.
   */
  const customerCareMessage =
    useMemo(() => {
      const details = [
        name,
        colour
          ? `Colour: ${colour}`
          : null,
        selectedVariant?.size
          ? `Size: ${selectedVariant.size}`
          : null,
      ]
        .filter(Boolean)
        .join(", ")

      return encodeURIComponent(
        `Hello Giftij Brandy, I am interested in ${details}, but it is currently out of stock. Please let me know if it is available or if there is an alternative.`,
      )
    }, [
      name,
      colour,
      selectedVariant?.size,
    ])

  const customerCareUrl =
    `https://wa.me/${CUSTOMER_CARE_WHATSAPP}?text=${customerCareMessage}`

  function handleAddToCart() {
    if (isOutOfStock) {
      return
    }

    /**
     * Variant products must always enter the cart with their exact SKU.
     */
    if (
      hasVariants &&
      !selectedVariant?.sku
    ) {
      return
    }

    addItem(
      {
        id: `${productSlug}--${
          group?.colorSlug ??
          "default"
        }--${
          selectedVariant?.sku ??
          "default"
        }`,

        productSlug,
        name,
        colour,

        size:
          selectedVariant?.size ??
          null,

        sku:
          selectedVariant?.sku ??
          null,

        price,
        image,
      },

      quantity,
    )
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
            {sizes.map(
              (variant) => {
                const unavailable =
                  variant.inStock ===
                  false

                return (
                  <button
                    key={
                      variant.sku
                    }
                    type="button"
                    className="gb-colour-swatch"
                    data-active={
                      variant.size ===
                      selectedSize
                    }
                    data-out-of-stock={
                      unavailable
                    }
                    disabled={
                      unavailable
                    }
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
                            opacity:
                              0.45,
                            cursor:
                              "not-allowed",
                          }
                        : undefined
                    }
                  >
                    {variant.size}
                  </button>
                )
              },
            )}
          </div>
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
            onClick={() =>
              setQuantity(
                (current) =>
                  Math.max(
                    1,
                    current - 1,
                  ),
              )
            }
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={() =>
              setQuantity(
                (current) =>
                  current + 1,
              )
            }
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
            This selection is currently
            out of stock.
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
                letterSpacing:
                  "0.08em",
                textTransform:
                  "uppercase",
              }}
            >
              Need this item?
            </p>

            <p
              style={{
                margin:
                  "8px 0 0",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Contact customer care
              to check availability
              or available
              alternatives.
            </p>

            <p
              style={{
                margin:
                  "12px 0 0",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Contact customer care:{" "}
              {CUSTOMER_CARE_PHONE}
            </p>

            <a
              href={
                customerCareUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="gb-btn"
              style={{
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                width: "100%",
                marginTop: 16,
                textDecoration:
                  "none",
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