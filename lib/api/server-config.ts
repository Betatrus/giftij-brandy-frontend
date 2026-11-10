import "server-only"

/**
 * Server-only configuration for storefront product reads.
 *
 * IMPORTANT:
 * - Nothing in this file may be imported into a Client Component.
 * - STOREFRONT_API_SECRET must NEVER use a NEXT_PUBLIC_ prefix.
 * - Product catalogue requests use this configuration so the browser does
 *   not need direct access to the protected admin product endpoints.
 */

const DEFAULT_API_BASE =
  "https://api.giftijbrandy.com/api/v1/public"

export const SERVER_API_BASE = (
  process.env.GIFTIJ_API_BASE ??
  process.env.NEXT_PUBLIC_GIFTIJ_API_BASE ??
  DEFAULT_API_BASE
).replace(/\/+$/, "")

export function getStorefrontApiSecret(): string {
  const secret = process.env.STOREFRONT_API_SECRET?.trim()

  if (!secret) {
    throw new Error(
      "STOREFRONT_API_SECRET is not configured for the storefront server.",
    )
  }

  return secret
}

/**
 * Admin Preview deployments are protected by Vercel Authentication.
 * The optional bypass token is server-only and must be configured in the
 * storefront Preview environment; never expose it to the browser.
 */
export function getStorefrontApiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Storefront-Key": getStorefrontApiSecret(),
  }
  const bypassSecret = process.env.ADMIN_PREVIEW_BYPASS_SECRET?.trim()

  if (bypassSecret) {
    headers["x-vercel-protection-bypass"] = bypassSecret
  }

  return headers
}