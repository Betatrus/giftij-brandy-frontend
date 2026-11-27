import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const upstream = await fetch(`${SERVER_API_BASE}/storefront/status`, {
      method: "GET", headers: getStorefrontApiHeaders(), cache: "no-store",
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[storefront-status-proxy] status request failed", error);
    return Response.json({ success: false }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
