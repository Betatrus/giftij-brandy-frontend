# Giftij Brandy Storefront

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## This round

**Drawer menu — actual bug found and fixed, not just recolored.** From
your screenshot: every link (Home, Our Story, Help & Support, Contact)
was dim, while "Shop" — the one `<button>`, not an `<a>` — was crisp
white. That split was the tell. `.gb-app a { color: inherit; }`
(specificity: one class + the element = 0,1,1) was beating `.gb-link` /
`.gb-sublink` / `.gb-drawer-logo` (each just one class = 0,1,0),
*regardless of source order*, so those links fell back to a dark
"foreground" color meant for light pages — a `<button>` was never
touched by that rule. Fixed by scoping every drawer text rule under
`.gb-drawer` so it always wins that specificity fight. Gold (#C9A84C)
now stays on the brand mark and accents only; every nav label is solid
white and actually renders that way now.

**Category: standardized on "bags"** (plural), per your direction — no
code change needed, the singular/plural tolerance already treats
"bag"/"bags" as equivalent.

## Backend status — still open, still the real blocker

I checked the live API again while diagnosing this. It's back to
`total: 1`, missing even the "king" Bag product from two rounds ago —
same list-endpoint flakiness already flagged (cache-key collision).
**This is why your newest Bags product isn't showing: the API isn't
consistently returning it, not a frontend bug.** This needs the backend
fix applied before category browsing will look reliable.

## Not included (agreed later phase)

Paystack / payment processing, checkout stock validation. No invented
stock values anywhere. Admin repository untouched.
