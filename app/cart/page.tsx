"use client"

import Link from "next/link"
import { SiteNav } from "@/components/layout/site-nav"
import { useCart } from "@/lib/cart/cart-context"
import { formatPrice } from "@/lib/format"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalCount } = useCart()

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
          <div className="gb-cart-page">
            <div className="gb-cart-items">
              {items.map((item) => (
                <div key={item.id} className="gb-cart-row gb-cart-product-card">
                  <div className="gb-cart-thumb">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} />
                    ) : null}
                  </div>

                  <div className="gb-cart-product-info">
                    <p className="gb-product-name">{item.name}</p>
                    {(item.colour || item.size) && (
                      <p className="gb-product-colour">
                        {[item.colour, item.size].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="gb-product-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="gb-cart-product-actions">
                    <div className="gb-qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="gb-cart-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="gb-cart-summary-card">
              <div className="gb-cart-total">
                <span>
                  Subtotal ({totalCount} item{totalCount === 1 ? "" : "s"})
                </span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <div className="gb-cart-stock-message">
                <span className="gb-cart-stock-icon">✓</span>
                <p>Stock availability is confirmed from the store in real time.</p>
              </div>

              <Link href="/checkout" className="gb-cart-checkout-btn">
                Check Stock &amp; Continue to Payment
              </Link>

              <Link href="/shop" className="gb-cart-continue-btn">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
    </>
  )
}
