import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Jost, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart/cart-context"
import { CartAddedPopup } from "@/components/cart/cart-added-popup"
import "./globals.css"
import "@/styles/storefront.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
})

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Giftij Brandy — Uniquely Maintain Your Style With Us",
  description:
    "Giftij Brandy — everything fashion bags, shoes and slippers, budget-friendly to premium.",
  icons: {
    icon: "/Logo.jpg",
    apple: "/Logo.jpg",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fdfaf5",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable}`}
    >
      <body className="gb-app antialiased">
        <CartProvider>
          {children}
          <CartAddedPopup />
        </CartProvider>

        {process.env.NODE_ENV === "production" && (
          <Analytics />
        )}
      </body>
    </html>
  )
}