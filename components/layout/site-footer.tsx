import Link from "next/link"
import { FooterSocials } from "./social-links"

export function SiteFooter() {
  return (
    <footer className="gb-footer">
      <div className="gb-footer-top">
        <div>
          <p className="gb-footer-brand-name">GIFTIJ <span>BRANDY</span></p>
          <p className="gb-footer-tagline">Uniquely Maintain Your Style With Us.<br />Everything fashion bags — budget-friendly to luxury.</p>
          <FooterSocials />
        </div>
        <div>
          <p className="gb-footer-col-title">Shop</p>
          <ul className="gb-footer-links">
            <li><Link href="/shop?category=bags">Bags</Link></li>
            <li><Link href="/shop?category=shoes">Shoes</Link></li>
            <li><Link href="/shop?category=slippers">Slippers</Link></li>
            <li><Link href="/shop">All Products</Link></li>
          </ul>
        </div>
        <div>
          <p className="gb-footer-col-title">Explore</p>
          <ul className="gb-footer-links">
            <li><Link href="/story">Our Story</Link></li>
            <li><Link href="/contact">Contact &amp; Support</Link></li>
            <li><Link href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="gb-footer-col-title">Stay Connected</p>
          <ul className="gb-footer-links">
            <li><a href="mailto:jacobsgift3@gmail.com">jacobsgift3@gmail.com</a></li>
            <li><a href="https://wa.me/2349023021320" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
          </ul>
        </div>
      </div>
      <div className="gb-footer-bottom">
        <p className="gb-footer-copy">© {new Date().getFullYear()} Giftij Brandy. Uniquely Maintain Your Style With Us.</p>
        <div className="gb-footer-legal"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
      </div>
    </footer>
  )
}
