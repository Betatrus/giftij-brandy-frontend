import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { CartProvider } from "@/lib/cart/cart-context"
import { CartAddedPopup } from "@/components/cart/cart-added-popup"
import "./globals.css"
import "@/styles/storefront.css"

const playfair = localFont({
  src: [
    { path: "./fonts/playfair-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/playfair-italic-400.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
})

const jost = localFont({
  src: "./fonts/jost-400.ttf",
  weight: "400",
  variable: "--font-jost",
  display: "swap",
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
