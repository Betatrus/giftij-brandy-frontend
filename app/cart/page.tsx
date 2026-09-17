"use client"

import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  return (
    <>
      <SiteNav theme="light" />

      <section className="gb-page-header">
        <span className="gb-page-eyebrow">Your Cart</span>
        <span className="gb-page-title">Cart</span>
      </section>

      <main className="gb-shop-main">
        {items.length === 0 ? (
          <div className="gb-empty-state">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="gb-btn" style={{ marginTop: 20 }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ maxWidth: 720 }}>
            {items.map((item) => (
              <div key={item.id} className="gb-cart-row">
                <div className="gb-cart-thumb">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="gb-product-name">{item.name}</p>
                  {item.colour && (
                    <p className="gb-product-colour">
                      {item.colour}
                      {item.size ? ` · ${item.size}` : ""}
                    </p>
                  )}
                  <p className="gb-product-price">{formatPrice(item.price)}</p>
                </div>
                <div className="gb-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                </div>
                <button className="gb-cart-remove" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="gb-cart-total">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <p className="gb-pdp-stock-note">
              Availability and final pricing are confirmed at checkout against the Giftij backend.
            </p>
          </div>
        )}
      </main>
    </>
  )
}
