const base = (process.env.GIFTIJ_API_BASE || "").replace(/\/+$/, "");
const storefrontSecret = process.env.STOREFRONT_API_SECRET?.trim();
const bypassSecret = process.env.ADMIN_PREVIEW_BYPASS_SECRET?.trim();

if (!base || !storefrontSecret || !bypassSecret) {
  throw new Error("Preview API smoke test requires GIFTIJ_API_BASE, STOREFRONT_API_SECRET and ADMIN_PREVIEW_BYPASS_SECRET.");
}

const headers = {
  "X-Storefront-Key": storefrontSecret,
  "x-vercel-protection-bypass": bypassSecret,
};

async function readJson(path) {
  const response = await fetch(`${base}${path}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Admin Preview API ${path} returned HTTP ${response.status}.`);
  }
  const payload = await response.json();
  if (payload?.success !== true) {
    throw new Error(`Admin Preview API ${path} did not return success:true.`);
  }
  return payload.data;
}

async function main() {
  const [settings, posts, products, categories] = await Promise.all([
    readJson("/blog-settings"),
    readJson("/blog"),
    readJson("/products"),
    readJson("/categories"),
  ]);

  if (typeof settings?.blogNavigationVisible !== "boolean" ||
      typeof settings?.blogIndexingEnabled !== "boolean") {
    throw new Error("Admin Preview blog settings response has an invalid shape.");
  }
  if (!Array.isArray(posts) || !Array.isArray(products) || !Array.isArray(categories)) {
    throw new Error("Admin Preview catalogue/blog API responses have an invalid shape.");
  }

  console.log("[preview-api-check] PASS: protected Admin Preview API is reachable with the Preview bypass and storefront key.");
  console.log("[preview-api-check] Blog settings, published blog list, products and categories endpoints returned valid responses.");
  console.log("[preview-api-check] Published blog posts:", posts.length, "| Products:", products.length, "| Categories:", categories.length);
}

main().catch((error) => {
  console.error("[preview-api-check] FAIL:", error.message);
  process.exitCode = 1;
});
