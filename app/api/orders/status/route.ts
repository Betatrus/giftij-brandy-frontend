import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference")
  if (!reference) {
    return Response.json(
      { success: false, error: { code: "REFERENCE_REQUIRED", message: "Payment reference is required." } },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    )
  }

  try {
    const upstreamUrl = new URL(`${SERVER_API_BASE}/orders/status`)
    upstreamUrl.searchParams.set("reference", reference)

    const upstream = await fetch(upstreamUrl, {
      headers: getStorefrontApiHeaders(),
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
    console.error("[order-status-proxy] Admin Preview request failed", error)
    return Response.json(
      { success: false, error: { code: "ORDER_STATUS_PROXY_FAILED", message: "Could not check payment status." } },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
