# Giftij Brandy Storefront — Cloudflare Preview setup

This branch is the Cloudflare migration Preview branch. Keep the existing storefront design and customer experience unchanged.

## Workers Builds

Configure the Storefront Worker build settings:

- Production branch: `main`
- Build command: `npm run cloudflare:build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`
- Root directory: `/`
- Build variable: `SKIP_DEPENDENCY_INSTALL=1` (the build script runs `npm install` itself to synchronize the lockfile before OpenNext builds)

Use Worker Previews for branch testing. Preview variables are isolated in the `previews` block of `wrangler.jsonc`.

## Existing services

Cloudinary remains the image CDN. The existing direct image delivery setting is preserved; this setup does not migrate images to Cloudflare Images or R2.

The Storefront Worker does not receive database credentials. It should call the Admin/API endpoint using the existing application configuration. Configure any required API origin and public environment variables in the Preview environment with the exact names already used by the application; do not point Preview traffic at the Production Admin API.

## Preview acceptance checks

1. Confirm homepage, category, product and editorial pages render.
2. Confirm product images load from Cloudinary.
3. Test navigation, search, product variants, cart and checkout on desktop and mobile.
4. Confirm cart and checkout API requests use the Admin Preview endpoint.
5. Run Paystack Test-mode checkout through the Admin Preview webhook and confirm no Production database or live payment is involved.
6. Verify the storefront design and existing UX have not changed.

Do not switch DNS or connect the Storefront to Production until the Admin and Storefront Preview checks pass.
