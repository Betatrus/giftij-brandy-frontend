"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart/cart-context"
import { CATEGORIES } from "@/lib/api/config"
import { CONTACT_EMAIL, DrawerSocials } from "./social-links"

function Chevron({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.75} viewBox="0 0 9 16" fill="none">
      <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function SiteNav({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const { totalCount } = useCart()
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)\n  const [blogVisible, setBlogVisible] = useState(false)\n\n  useEffect(() => {\n    let active = true\n    fetch("/api/blog-settings", { cache: "no-store" })\n      .then((response) => response.ok ? response.json() : null)\n      .then((settings) => { if (active) setBlogVisible(settings?.blogNavigationVisible === true) })\n      .catch(() => { if (active) setBlogVisible(false) })\n    return () => { active = false }\n  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.body.classList.toggle("gb-menu-open", open)
    const videos = Array.from(document.querySelectorAll("video"))
    if (open) videos.forEach((v) => v.pause())
    else videos.forEach((v) => v.play().catch(() => {}))
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("gb-menu-open")
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  function close() {
    setOpen(false)
    setShopOpen(false)
  }

  return (
    <>
      <button className="gb-menu-fab" data-theme={theme} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <Link href="/cart" className="gb-cart-fab" data-theme={theme} aria-label="View cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {totalCount > 0 && <span className="gb-cart-count">{totalCount}</span>}
      </Link>
      {open && (
        <div className="gb-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="gb-drawer" role="dialog" aria-modal="true" aria-label="Main menu">
            <div className="gb-drawer-top">
              <Link href="/" className="gb-drawer-logo" onClick={close}>GIFTIJ <span>BRANDY</span></Link>
              <button className="gb-close" onClick={close} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="gb-links">
              <Link href="/" className="gb-link" onClick={close}>Home <Chevron /></Link>
              <button className="gb-link" onClick={() => setShopOpen((v) => !v)} aria-expanded={shopOpen}>
                Shop <span style={{ transform: shopOpen ? "rotate(90deg)" : "none", transition: "transform 0.25s", display: "flex" }}><Chevron /></span>
              </button>
              {shopOpen && (
                <div className="gb-sublinks">
                  {CATEGORIES.map((c) => <Link key={c.slug} href={`/shop?category=${c.slug}`} className="gb-sublink" onClick={close}>{c.name} <Chevron size={7} /></Link>)}
                </div>
              )}
              <Link href="/story" className="gb-link" onClick={close}>Our Story <Chevron /></Link>
              {blogVisible && <Link href="/blog" className="gb-link" onClick={close}>Blog <Chevron /></Link>}\n              <Link href="/contact" className="gb-link" onClick={close}>Contact &amp; Support <Chevron /></Link>
              <Link href="/cart" className="gb-link" onClick={close}>Cart <Chevron /></Link>
            </div>
            <div className="gb-follow"><p className="gb-follow-label">Follow Us</p><DrawerSocials /></div>
            <div className="gb-contact">
              <p className="gb-contact-label">Questions?<br />Contact Us</p>
              <p className="gb-contact-mini">Email:</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
