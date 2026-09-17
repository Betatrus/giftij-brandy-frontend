"use client"

import { useMemo, useState } from "react"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"
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
  /** Base product's own `inStock` — only consulted when there's no variant to check instead. */
  productInStock?: boolean
}) {
  const { addItem } = useCart()
  const sizes = group?.sizes ?? []
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.size ?? null)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const selectedVariant = useMemo(
    () => sizes.find((s) => s.size === selectedSize) ?? null,
    [sizes, selectedSize],
  )

  // Prefer the selected variant's own stock signal; fall back to the base
  // product's `inStock` only for a product with no variants at all.
  const isOutOfStock = selectedVariant ? selectedVariant.inStock === false : !productInStock

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
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div>
      {sizes.length > 1 && (
        <div style={{ marginBottom: 24 }}>
          <p className="gb-pdp-section-title">Size</p>
          <div className="gb-colour-list">
            {sizes.map((s) => (
              <button
                key={s.sku}
                type="button"
                className="gb-colour-swatch"
                data-active={s.size === selectedSize}
                onClick={() => setSelectedSize(s.size)}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <p className="gb-pdp-section-title">Quantity</p>
        <div className="gb-qty">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            −
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
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
        {isOutOfStock ? "Out of Stock" : justAdded ? "Added to Cart" : "Add to Cart"}
      </button>

      {/*
        Deliberately no invented stock COUNT here. Real-time availability
        is re-confirmed against the backend again at checkout; this only
        reflects what the product API itself already told us.
      */}
      {isOutOfStock && (
        <p className="gb-pdp-stock-note">This colour/size is currently out of stock.</p>
      )}
    </div>
  )
}
