import type { Metadata } from "next"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://giftijbrandy.com"
).replace(/\/+$/, "")

export const SITE_NAME = "Giftij Brandy"

export const DEFAULT_DESCRIPTION =
  "Shop stylish bags, shoes and slippers at Giftij Brandy. Discover fashion pieces for everyday style, with online ordering and delivery from Port Harcourt, Nigeria."

export function absoluteUrl(path = "/"): string {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString()
}

export function cleanDescription(value: string | null | undefined, fallback = DEFAULT_DESCRIPTION): string {
  const cleaned = value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  if (!cleaned) return fallback
  return cleaned.length > 300 ? `${cleaned.slice(0, 297).trimEnd()}...` : cleaned
}

export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl("/Logo.jpg")

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: "en_NG",
      images: [{ url: imageUrl, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}
