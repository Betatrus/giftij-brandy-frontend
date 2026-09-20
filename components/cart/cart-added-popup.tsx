"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"

export function CartAddedPopup() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    items,
    cartPopupOpen,
    closeCartPopup,
  } = useCart()

  if (
    !cartPopupOpen ||
    items.length === 0 ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/")
  ) {
    return null
  }

  const item = items[items.length - 1]

  return (
    <div
      className="gb-cart-popup-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Item added to cart"
      onClick={closeCartPopup}
    >
      <div
        className="gb-cart-popup"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="gb-cart-popup-title">
          <span className="gb-cart-popup-check">✓</span>
          <span>Item added to your cart</span>
        </div>

        <div className="gb-cart-popup-product">
          <div className="gb-cart-popup-image">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="gb-cart-popup-image-placeholder" />
            )}
          </div>

          <div className="gb-cart-popup-details">
            <p className="gb-cart-popup-name">
              {item.name}
            </p>

            {item.size && (
              <p>Size: {item.size}</p>
            )}

            {item.colour && (
              <p>Colour: {item.colour}</p>
            )}

            <p>Quantity: {item.quantity}</p>

            <p className="gb-cart-popup-price">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="gb-cart-popup-primary"
          onClick={() => {
            closeCartPopup()
            router.push("/cart")
          }}
        >
          View Cart ({items.length})
        </button>

        <button
          type="button"
          className="gb-cart-popup-secondary"
          onClick={() => {
            closeCartPopup()
            router.push("/checkout")
          }}
        >
          Check Out
        </button>

        <button
          type="button"
          className="gb-cart-popup-continue"
          onClick={closeCartPopup}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
