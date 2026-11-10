# Cloudflare migration readiness — Storefront

Status: **not production-ready for Cloudflare yet**. This branch is a non-production preparation branch based on `staging/checkout-10-minute-reservation`. No Cloudflare account resources, secrets, domains, Vercel settings, or live traffic are changed here.

## Verified source baseline

- Source Preview branch: `staging/checkout-10-minute-reservation`
- Source commit inspected: `26772803200d387c2ce09906fc914086d45b358d`
- Next.js 16.2.6, React 19.
- Existing Vercel build command is `sh scripts/vercel-build.sh`; it optionally runs a protected Admin Preview API smoke test and then `next build --webpack`.
- `next.config.mjs` currently sets `typescript.ignoreBuildErrors: true`. This is a release blocker: Cloudflare CI must run `tsc --noEmit` independently until all errors are resolved, then the ignore flag must be removed and a normal build must type-check.
- `vercel.json` contains a Vercel-specific build command and is not a Cloudflare deployment configuration.

## Hosting approach

Use Cloudflare Workers, not Pages, for the full-stack storefront. Cloudflare currently recommends vinext for Next.js 16+ Workers migrations. Start with the documented non-destructive `vinext check` / `vinext init` flow on this branch; keep existing Next.js scripts and the Vercel Preview deployment path intact while validating. Do not assume vinext's beta compatibility is production-safe without running the full storefront journey on a Worker Preview.

## Blocking compatibility work

1. Run `npx vinext check` and review every unsupported or partially supported Next.js API/import. Resolve the findings before enabling Worker deployment.
2. Keep the existing design, routes, App Router behavior, metadata, sitemap, robots, blog, product pages, cart, checkout and callback UX unchanged.
3. Remove the Vercel-specific `x-vercel-protection-bypass` header path from the Cloudflare migration branch. Replace protected Admin Preview access with a Cloudflare Access/private Preview policy and a server-only service credential. Do not make the Admin API public just to simplify integration.
4. Keep `STOREFRONT_API_SECRET` server-only. Never use a `NEXT_PUBLIC_` name for it or expose it through a client component, browser request, HTML, logs, or source maps.
5. Keep `GIFTIJ_API_BASE` as a server-only Worker variable where possible. Public API URLs may be public, but secret headers must be added only server-side.
6. Preserve the same-origin checkout initialization and order-status proxy routes. Verify they call the Admin Preview API securely and do not leak server credentials.
7. Verify all `NEXT_PUBLIC_*` values are set at build time for each Worker environment; do not place credentials in them.
8. Verify Cloudinary image delivery. The current Next config disables Next image optimization; preserve current image appearance and confirm remote image behavior on Workers.
9. Remove or replace Vercel-specific analytics only after verifying what telemetry it provides and selecting an equivalent or deciding it is not required. Do not let analytics block checkout.
10. Configure separate Worker Preview and Production variables. Preview must call only the Admin Preview API; it must never fall back to Production.

## Required acceptance matrix

- [ ] Clean install, TypeScript check, lint, vinext compatibility check, Worker build, and Worker Preview boot.
- [ ] Home, shop, category, product, blog index/article, offers, support, metadata, JSON-LD, sitemap and robots.
- [ ] Mobile/desktop visual regression: no design or UX changes.
- [ ] Public catalogue reads, blog settings/posts, offers, CORS and protected Admin API authentication.
- [ ] Cart persistence, checkout initialization, same-origin callback, order-status polling and payment-success UI.
- [ ] Paystack Test Mode success, decline, retry, abandoned payment, duplicate status/webhook delivery and expired reservation.
- [ ] Confirm the storefront never decrements stock itself and never treats a redirect/callback as payment confirmation.
- [ ] No server secret in browser bundles, HTML, source maps, client network requests, or logs.
- [ ] Cloudinary images, cache behavior, error states, observability and rollback rehearsal.
- [ ] Repeat all checkout/payment/inventory tests against the exact Worker Preview build intended for release.

## Release rules

- This branch is not a Production deployment.
- Keep Vercel Preview and Production intact during migration work.
- Do not create Cloudflare Production secrets, custom domains, DNS changes, or cut over traffic without explicit approval.
- A successful vinext compatibility report or compile alone does not prove payment or inventory correctness.
