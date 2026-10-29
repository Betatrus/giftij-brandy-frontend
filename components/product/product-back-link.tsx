
"use client"

import Link from "next/link"

export function ProductBackLink() {
  function handleBackClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    if (!document.referrer) return

    try {
      const previousPage = new URL(document.referrer)

      if (
        previousPage.origin === window.location.origin &&
        previousPage.pathname.replace(/\/+$/, "") === "/shop"
      ) {
        event.preventDefault()
        window.history.back()
      }
    } catch {
      // Fall back to the shop link.
    }
  }

  return (
    <div className="gb-product-back-wrap">
      <Link
        href="/shop"
        onClick={handleBackClick}
        className="gb-product-back"
        aria-label="Back to Shop"
      >
        <span aria-hidden="true">←</span>
        <span>Back to Shop</span>
      </Link>

      <style jsx>{`
        .gb-product-back-wrap {
          padding: 76px 24px 12px;
        }

        .gb-product-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          color: #4a4540;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }

        .gb-product-back:hover {
          color: #211629;
        }

        .gb-product-back:focus-visible {
          outline: 2px solid #6f2c91;
          outline-offset: 4px;
        }

        @media (max-width: 640px) {
          .gb-product-back-wrap {
            padding: 72px 16px 8px;
          }
        }
      `}</style>
    </div>
  )
}
