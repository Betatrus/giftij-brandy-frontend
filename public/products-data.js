// ════════════════════════════════════════════════════════
// GIFTIJ BRANDY — LIVE PRODUCT DATA (replaces the mock products-data.js)
//
// This file is a drop-in replacement. product-render.js is UNCHANGED —
// it still calls getProducts() / getFeaturedProducts() and gets back
// the exact same shape it always did. Everything below this comment is
// the adapter: it fetches from the real API and translates the response
// into that shape. See docs/API_CONTRACT.md ("Storefront Adapter &
// Mock-Data Independence") in the admin repo for the full mapping
// rationale — this file is the implementation of that document.
//
// WHERE TO POINT THIS: set GB_API_BASE below to your environment's API
// URL. Defaults to production.
// ════════════════════════════════════════════════════════

const GB_API_BASE = 'https://api.giftij.com/api/v1/public';

// Simple in-memory cache so multiple calls within one page load (e.g. a
// featured grid AND a full shop grid on the same page) don't refetch.
// Cleared on full page load — no cross-navigation persistence, no
// localStorage involved.
let _gbProductCache = null;
let _gbProductCachePromise = null;

async function gbFetchAllActiveProducts() {
  if (_gbProductCache) return _gbProductCache;
  if (_gbProductCachePromise) return _gbProductCachePromise;

  _gbProductCachePromise = (async () => {
    try {
      // pageSize 50 (the public API's max) covers the current catalog size
      // in one request. If the catalog grows past that, this needs real
      // pagination — flagging now so it's not a silent ceiling later.
      const res = await fetch(`${GB_API_BASE}/products?pageSize=50&sort=newest`);
      const json = await res.json();

      if (!json.success) {
        console.error('Giftij API error:', json.error);
        return [];
      }

      _gbProductCache = json.data.map(gbAdaptProductSummary);
      return _gbProductCache;
    } catch (err) {
      console.error('Giftij API request failed:', err);
      return [];
    }
  })();

  return _gbProductCachePromise;
}

// ── Adapter: API ProductSummary shape -> mock product-render.js shape ──

function gbDeriveBadge(discount, featuredFlags) {
  if (discount && discount > 0) return 'Sale';
  if (featuredFlags.includes('best_sellers')) return 'Best Seller';
  if (featuredFlags.includes('new_arrivals')) return 'New';
  if (featuredFlags.includes('fan_favorites')) return 'Fan Fave';
  return null;
}

function gbDeriveOldPrice(price, discount) {
  return discount && discount > 0 ? price : null;
}

function gbDiscountedPrice(price, discount) {
  return discount && discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
}

// The mock's `images` array holds raw markup injected via `innerHTML`.
// A bare Cloudinary URL would render as literal text, not a photo — so
// every URL gets wrapped as a real <img> tag here. This is the one part
// of the adapter that's a genuine translation, not just a rename; if
// something looks visually wrong after cutover, check here first.
function gbWrapImageMarkup(url, altText) {
  const alt = (altText || '').replace(/"/g, '&quot;');
  return `<img src="${url}" alt="${alt}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
}

function gbAdaptProductSummary(p) {
  const displayPrice = gbDiscountedPrice(p.price, p.discount);
  const oldPrice = gbDeriveOldPrice(p.price, p.discount);
  const images = (p.images && p.images.length > 0 ? p.images : [p.coverImage].filter(Boolean))
    .map((url) => gbWrapImageMarkup(url, p.name));

  return {
    id: p.slug, // mock used a slug-like string as `id` — real slug is a drop-in match
    name: p.name,
    material: null, // filled in by gbAdaptProductDetail() when available; see note below
    price: displayPrice,
    oldPrice: oldPrice,
    badge: gbDeriveBadge(p.discount, p.featuredFlags),
    category: p.category.slug,
    featured: p.featuredFlags.length > 0,
    images: images.length > 0 ? images : [gbWrapImageMarkup('', p.name)],
    inStock: p.inStock,
  };
}

// The list endpoint doesn't return specs (material comes from a Spec
// labeled "Material" + variant color — see API_CONTRACT.md), so grid
// cards need a lightweight per-card detail fetch to populate `material`
// the first time it's rendered. This trades one extra request per visible
// card for not having to change what the list endpoint returns. If this
// turns out to be too chatty at scale, the alternative is adding a
// lightweight `materialLabel` field to the list endpoint itself — that's
// a contract change, so flag it rather than silently reaching for it here.
async function gbEnrichWithMaterial(product) {
  if (product._materialAttempted) return product; // already tried this page load, don't refetch
  product._materialAttempted = true;

  try {
    const res = await fetch(`${GB_API_BASE}/products/${product.id}`);
    const json = await res.json();
    if (!json.success) return product;

    const materialSpec = (json.data.specs || []).find((s) => s.label === 'Material');
    const firstVariantColor = (json.data.variants || [])[0]?.color;
    product.material = [materialSpec?.value, firstVariantColor].filter(Boolean).join(' · ') || null;
    return product;
  } catch {
    return product; // material stays null — card still renders, just without that line
  }
}

// ── Public API — same function names/signatures the mock exposed ───────

async function getProducts() {
  const products = await gbFetchAllActiveProducts();
  // Only enrich products that haven't been enriched yet — getProducts()
  // may be called multiple times per page (e.g. two separate featured
  // grids); without this check, every call would re-fetch every product's
  // detail endpoint again.
  await Promise.all(products.filter((p) => !p._materialAttempted).map(gbEnrichWithMaterial));
  return products;
}

async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}
