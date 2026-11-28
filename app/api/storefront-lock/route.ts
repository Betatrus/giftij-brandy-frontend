import { NextResponse } from "next/server"
import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const response = await fetch(`${SERVER_API_BASE}/storefront-lock`, {
      headers: getStorefrontApiHeaders(),
      cache: "no-store",
    })
    if (!response.ok) {
      return NextResponse.json(
        { checkoutLocked: true, message: "Checkout is temporarily unavailable. Please try again shortly." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      )
    }
    const payload = await response.json()
    const data = payload?.data ?? payload
    return NextResponse.json(
      { checkoutLocked: Boolean(data?.checkoutLocked), message: typeof data?.message === "string" ? data.message : "" },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return NextResponse.json(
      { checkoutLocked: true, message: "Checkout is temporarily unavailable. Please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
}
