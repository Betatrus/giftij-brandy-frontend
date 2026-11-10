import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const upstream = await fetch(`${SERVER_API_BASE}/checkout/initialize`, {
      method: "POST",
      headers: {
        ...getStorefrontApiHeaders(),
        "Content-Type": "application/json",
      },
      body: await request.text(),
      cache: "no-store",
    })

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("[checkout-proxy] Admin Preview request failed", error)
    return Response.json(
      { success: false, error: { code: "CHECKOUT_PROXY_FAILED", message: "Checkout service is temporarily unavailable. Please try again." } },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
