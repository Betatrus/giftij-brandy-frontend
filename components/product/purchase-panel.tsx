"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"
import { useCart } from "@/lib/cart/cart-context"
import type { VariantGroup } from "@/lib/api/types"

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
   * Prefer the first variant that is actually in stock.
   *
   * This is especially important for Shoes and Slippers where one colour
   * can have several size/SKU combinations and the first database variant
   * may legitimately have zero stock.
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
   * When the customer changes colour, the VariantGroup changes.
   *
   * React can preserve this client component's local state between those
   * navigations, so a size selected under the previous colour must not
   * remain selected for the new colour.
   *
   * Reset to the first available size belonging to the new colour.
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
   * Variant product:
   * the selected SKU owns its stock.
   *
   * Non-variant product:
   * fall back to the product-level stock signal.
   */
  const hasVariants =
    sizes.length > 0

  const isOutOfStock =
    hasVariants
      ? !selectedVariant ||
        selectedVariant.inStock ===
          false
      : !productInStock

  function handleAddToCart() {
    if (isOutOfStock) {
      return
    }

    /**
     * Variant products must never enter the cart without their real SKU.
     *
     * This protects Shoes/Slippers checkout because the backend later
     * resolves the exact colour + size combination using this SKU.
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

    /**
     * No separate popup code is needed here.
     *
     * addItem() in CartProvider already opens the same global
     * CartAddedPopup used by Bags.
     */
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
        <p className="gb-pdp-stock-note">
          This colour/size is currently
          out of stock.
        </p>
      )}
    </div>
  )
}