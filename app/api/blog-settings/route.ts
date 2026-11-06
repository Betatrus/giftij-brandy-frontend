import { NextResponse } from "next/server";
import { SERVER_API_BASE, getStorefrontApiSecret } from "@/lib/api/server-config";

export async function GET() {
  try {
    const response = await fetch(`${SERVER_API_BASE}/blog-settings`, {
      headers: { "X-Storefront-Key": getStorefrontApiSecret() }, cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ blogNavigationVisible: false }, { status: 200 });
    const payload = await response.json();
    return NextResponse.json(payload?.data ?? payload, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ blogNavigationVisible: false }, { status: 200 });
  }
}
