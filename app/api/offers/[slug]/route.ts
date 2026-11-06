import { SERVER_API_BASE, getStorefrontApiHeaders } from "@/lib/api/server-config";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  try {
    const upstream = await fetch(`${SERVER_API_BASE}/offers/${encodeURIComponent(slug)}`, {
      headers: getStorefrontApiHeaders(),
      cache: "no-store",
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[offer-detail-proxy] request failed", error);
    return Response.json({ success: false, error: { code: "OFFER_PROXY_FAILED", message: "Offer service is temporarily unavailable." } }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
