import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Jost, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart/cart-context"
import { CartAddedPopup } from "@/components/cart/cart-added-popup"
import { JsonLd } from "@/components/seo/json-ld"
import { SITE_URL, DEFAULT_DESCRIPTION } from "@/lib/seo"
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/components/layout/social-links"
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Giftij Brandy | Bags, Shoes & Slippers in Nigeria",
    template: "%s | Giftij Brandy",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Giftij Brandy",
  openGraph: {
    type: "website",
    siteName: "Giftij Brandy",
    description: DEFAULT_DESCRIPTION,
    locale: "en_NG",
    images: [{ url: "/Logo.jpg", alt: "Giftij Brandy" }],
  },
  twitter: {
    card: "summary_large_image",
    description: DEFAULT_DESCRIPTION,
    images: ["/Logo.jpg"],
  },
  robots: { index: true, follow: true },
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Store", "Organization"],
            "@id": `${SITE_URL}/#store`,
            name: "Giftij Brandy",
            url: SITE_URL,
            logo: `${SITE_URL}/Logo.jpg`,
            description: DEFAULT_DESCRIPTION,
            email: CONTACT_EMAIL,
            telephone: "+2349023021320",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Opposite Total Look Salon, Cornerstone, Off NTA Road",
              addressLocality: "Port Harcourt",
              addressRegion: "Rivers State",
              addressCountry: "NG",
            },
            openingHoursSpecification: [{
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "07:00",
              closes: "19:00",
            }],
            sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok, SOCIAL_LINKS.facebook],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Giftij Brandy",
            url: SITE_URL,
            inLanguage: "en-NG",
          }}
        />
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