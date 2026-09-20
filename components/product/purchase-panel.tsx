"use client"

import { useMemo, useState } from "react"
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
  /** Base product's own inStock is only used when there is no variant to check. */
  productInStock?: boolean
}) {
  const { addItem } = useCart()

  const sizes = group?.sizes ?? []

  const [selectedSize, setSelectedSize] = useState(
    sizes[0]?.size ?? null,
  )

  const [quantity, setQuantity] = useState(1)

  const selectedVariant = useMemo(
    () =>
      sizes.find(
        (s) => s.size === selectedSize,
      ) ?? null,
    [sizes, selectedSize],
  )

  // Prefer the selected variant's own stock signal.
  // Fall back to the base product's inStock only when
  // the product has no variants.
  const isOutOfStock = selectedVariant
    ? selectedVariant.inStock === false
    : !productInStock

  function handleAddToCart() {
    addItem(
      {
        id: `${productSlug}--${group?.colorSlug ?? "default"}--${selectedVariant?.sku ?? "default"}`,
        productSlug,
        name,
        colour,
        size: selectedVariant?.size ?? null,
        sku: selectedVariant?.sku ?? null,
        price,
        image,
      },
      quantity,
    )
  }

  return (
    <div>
      {sizes.length > 1 && (
        <div style={{ marginBottom: 24 }}>
          <p className="gb-pdp-section-title">
            Size
          </p>

          <div className="gb-colour-list">
            {sizes.map((s) => (
              <button
                key={s.sku}
                type="button"
                className="gb-colour-swatch"
                data-active={
                  s.size === selectedSize
                }
                onClick={() =>
                  setSelectedSize(s.size)
                }
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <p className="gb-pdp-section-title">
          Quantity
        </p>

        <div className="gb-qty">
          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                Math.max(1, q - 1),
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
              setQuantity((q) => q + 1)
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
        style={{ width: "100%" }}
      >
        {isOutOfStock
          ? "Out of Stock"
          : "Add to Cart"}
      </button>

      {isOutOfStock && (
        <p className="gb-pdp-stock-note">
          This colour/size is currently out of
          stock.
        </p>
      )}
    </div>
  )
}