#!/bin/sh
set -eu

# This opt-in exists only in Vercel Preview. Production storefront builds
# never call the Admin Preview API or run this smoke test.
if [ "${RUN_PREVIEW_API_TESTS:-}" = "1" ]; then
  echo "Running Preview-only Admin API smoke test."
  node scripts/preview-api-smoke-test.cjs
fi

npm run build
