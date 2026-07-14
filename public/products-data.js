// ════════════════════════════════════════════════════════
// GIFTIJ BRANDY — SHARED PRODUCT DATA
// Single source of truth for index1.html (featured) + shop.html (all).
// When the backend/admin (admin.domain.com) launches, only the
// getProducts() function in product-render.js needs to change
// (local array -> fetch from API). Card rendering, the featured
// filter, and the spec-image dots all read through getProducts()
// and don't need to change.
// ════════════════════════════════════════════════════════
const GB_PRODUCTS = [
  {
    id: "the-empress-tote",
    name: "The Empress Tote",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 185000,
    oldPrice: null,
    badge: "Best Seller",
    category: "rough-body",
    featured: true,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"45\" y=\"110\" width=\"150\" height=\"130\" rx=\"10\" fill=\"#C9A84C\" opacity=\"0.65\"/><path d=\"M75 110 Q75 80 95 72 Q120 65 145 72 Q165 80 165 110\" stroke=\"#C9A84C\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.7\"/><rect x=\"107\" y=\"162\" width=\"26\" height=\"20\" rx=\"4\" fill=\"#F5EDD8\" opacity=\"0.9\"/></svg>",
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"45\" y=\"110\" width=\"150\" height=\"130\" rx=\"10\" fill=\"#C9A84C\" opacity=\"0.4\"/><path d=\"M75 110 Q75 80 95 72 Q120 65 145 72 Q165 80 165 110\" stroke=\"#C9A84C\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.42\"/><rect x=\"107\" y=\"162\" width=\"26\" height=\"20\" rx=\"4\" fill=\"#F5EDD8\" opacity=\"0.9\"/></svg>",
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"45\" y=\"110\" width=\"150\" height=\"130\" rx=\"10\" fill=\"#8B6355\" opacity=\"0.65\"/><path d=\"M75 110 Q75 80 95 72 Q120 65 145 72 Q165 80 165 110\" stroke=\"#8B6355\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.7\"/><rect x=\"107\" y=\"162\" width=\"26\" height=\"20\" rx=\"4\" fill=\"#F5EDD8\" opacity=\"0.9\"/></svg>",
    ]
  },
  {
    id: "midnight-satchel",
    name: "Midnight Satchel",
    material: "Pebbled Leather \u00b7 Noir",
    price: 145000,
    oldPrice: 170000,
    badge: "New",
    category: "rough-body",
    featured: true,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/><rect x=\"50\" y=\"90\" width=\"140\" height=\"155\" rx=\"14\" fill=\"#2D2410\"/><path d=\"M80 90 Q80 60 100 55 Q120 50 140 55 Q160 60 160 90\" stroke=\"#C9A84C\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.6\"/><rect x=\"104\" y=\"158\" width=\"32\" height=\"22\" rx=\"5\" fill=\"#C9A84C\" opacity=\"0.7\"/></svg>",
    ]
  },
  {
    id: "the-boujee-bucket",
    name: "The Boujee Bucket",
    material: "Italian Leather \u00b7 Champagne",
    price: 120000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: true,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F5EEDE\"/><path d=\"M55 105 L40 240 L200 240 L185 105 Z\" fill=\"#C9A84C\" opacity=\"0.55\"/><path d=\"M55 105 Q55 80 120 78 Q185 80 185 105\" stroke=\"#C9A84C\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.55\"/><circle cx=\"120\" cy=\"175\" r=\"18\" fill=\"#F5EDD8\" opacity=\"0.7\"/><circle cx=\"120\" cy=\"175\" r=\"10\" fill=\"#C9A84C\" opacity=\"0.6\"/></svg>",
    ]
  },
  {
    id: "la-petite-crossbody",
    name: "La Petite Crossbody",
    material: "Smooth Leather \u00b7 Honey",
    price: 95000,
    oldPrice: null,
    badge: "Fan Fave",
    category: "coach",
    featured: true,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/><rect x=\"55\" y=\"115\" width=\"130\" height=\"105\" rx=\"20\" fill=\"#C9A84C\" opacity=\"0.6\"/><path d=\"M82 115 Q82 88 100 83 Q120 78 140 83 Q158 88 158 115\" stroke=\"#C9A84C\" stroke-width=\"7\" fill=\"none\" opacity=\"0.6\"/><circle cx=\"120\" cy=\"166\" r=\"9\" fill=\"#F5EDD8\" opacity=\"0.9\"/><path d=\"M185 130 Q220 130 220 160\" stroke=\"#C9A84C\" stroke-width=\"5\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.45\"/></svg>",
    ]
  },
  {
    id: "the-soir-e-clutch",
    name: "The Soir\u00e9e Clutch",
    material: "Satin Leather \u00b7 Noir",
    price: 58000,
    oldPrice: 75000,
    badge: "Sale",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"40\" y=\"95\" width=\"160\" height=\"115\" rx=\"28\" fill=\"#1A1A1A\" opacity=\"0.78\"/><rect x=\"56\" y=\"110\" width=\"128\" height=\"88\" rx=\"20\" fill=\"#C9A84C\" opacity=\"0.22\"/><rect x=\"100\" y=\"146\" width=\"40\" height=\"18\" rx=\"9\" fill=\"#C9A84C\" opacity=\"0.88\"/></svg>",
    ]
  },
  {
    id: "saddle-luxe",
    name: "Saddle Luxe",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 135000,
    oldPrice: null,
    badge: "New",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/><path d=\"M50 130 Q45 230 120 240 Q195 230 190 130 Q160 100 120 98 Q80 100 50 130Z\" fill=\"#C9A84C\" opacity=\"0.5\"/><path d=\"M90 130 Q90 100 120 95 Q150 100 150 130\" stroke=\"#8B6355\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.6\"/><ellipse cx=\"120\" cy=\"183\" rx=\"14\" ry=\"16\" fill=\"#F5EDD8\" opacity=\"0.6\"/><ellipse cx=\"120\" cy=\"183\" rx=\"7\" ry=\"8\" fill=\"#C9A84C\" opacity=\"0.7\"/></svg>",
    ]
  },
  {
    id: "urban-elegant-tote",
    name: "Urban Elegant Tote",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 175000,
    oldPrice: null,
    badge: "Best Seller",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"45\" y=\"110\" width=\"150\" height=\"130\" rx=\"10\" fill=\"#C9A84C\" opacity=\"0.65\"/></svg>",
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/><rect x=\"45\" y=\"110\" width=\"150\" height=\"130\" rx=\"10\" fill=\"#C9A84C\" opacity=\"0.4\"/></svg>",
    ]
  },
  {
    id: "premium-coach-bag",
    name: "Premium Coach Bag",
    material: "Smooth Leather \u00b7 Honey",
    price: 165000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "modern-black-satchel",
    name: "Modern Black Satchel",
    material: "Pebbled Leather \u00b7 Noir",
    price: 155000,
    oldPrice: null,
    badge: "New",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "cream-coach-special",
    name: "Cream Coach Special",
    material: "Italian Leather \u00b7 Champagne",
    price: 125000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F5EEDE\"/></svg>",
    ]
  },
  {
    id: "classic-camel-bag",
    name: "Classic Camel Bag",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 145000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "sale-crossbody",
    name: "Sale Crossbody",
    material: "Smooth Leather \u00b7 Honey",
    price: 105000,
    oldPrice: 130000,
    badge: "Sale",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "elegant-dark-bag",
    name: "Elegant Dark Bag",
    material: "Pebbled Leather \u00b7 Noir",
    price: 130000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "new-coach-premium",
    name: "New Coach Premium",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 140000,
    oldPrice: null,
    badge: "New",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/></svg>",
    ]
  },
  {
    id: "best-sellers-bag",
    name: "Best Sellers Bag",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 160000,
    oldPrice: null,
    badge: "Best Seller",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "coach-style-lite",
    name: "Coach Style Lite",
    material: "Smooth Leather \u00b7 Honey",
    price: 115000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F5EEDE\"/></svg>",
    ]
  },
  {
    id: "luxury-dark-tote",
    name: "Luxury Dark Tote",
    material: "Pebbled Leather \u00b7 Noir",
    price: 170000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "cognac-coach-elite",
    name: "Cognac Coach Elite",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 150000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "new-camel-chic",
    name: "New Camel Chic",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 180000,
    oldPrice: null,
    badge: "New",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "fan-fave-coach",
    name: "Fan Fave Coach",
    material: "Smooth Leather \u00b7 Honey",
    price: 110000,
    oldPrice: null,
    badge: "Fan Fave",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/></svg>",
    ]
  },
  {
    id: "noir-statement-bag",
    name: "Noir Statement Bag",
    material: "Pebbled Leather \u00b7 Noir",
    price: 135000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "sale-cognac-bag",
    name: "Sale Cognac Bag",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 145000,
    oldPrice: 170000,
    badge: "Sale",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "premium-tote-collection",
    name: "Premium Tote Collection",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 195000,
    oldPrice: null,
    badge: "Best Seller",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "honey-shade-coach",
    name: "Honey Shade Coach",
    material: "Smooth Leather \u00b7 Honey",
    price: 155000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/></svg>",
    ]
  },
  {
    id: "new-black-clutch",
    name: "New Black Clutch",
    material: "Pebbled Leather \u00b7 Noir",
    price: 125000,
    oldPrice: null,
    badge: "New",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "elegant-coach-piece",
    name: "Elegant Coach Piece",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 120000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "timeless-camel-bag",
    name: "Timeless Camel Bag",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 150000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "fan-fav-honey",
    name: "Fan Fav Honey",
    material: "Smooth Leather \u00b7 Honey",
    price: 130000,
    oldPrice: null,
    badge: "Fan Fave",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/></svg>",
    ]
  },
  {
    id: "bold-black-collection",
    name: "Bold Black Collection",
    material: "Pebbled Leather \u00b7 Noir",
    price: 140000,
    oldPrice: null,
    badge: null,
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "sale-cognac-coach",
    name: "Sale Cognac Coach",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 100000,
    oldPrice: 125000,
    badge: "Sale",
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "elegant-camel-tote",
    name: "Elegant Camel Tote",
    material: "Full-Grain Leather \u00b7 Camel",
    price: 185000,
    oldPrice: null,
    badge: "New",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE0CC\"/></svg>",
    ]
  },
  {
    id: "premium-cognac-bag",
    name: "Premium Cognac Bag",
    material: "Vegetable-Tanned \u00b7 Cognac",
    price: 160000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#F0E6D6\"/></svg>",
    ]
  },
  {
    id: "best-seller-dark-bag",
    name: "Best Seller Dark Bag",
    material: "Pebbled Leather \u00b7 Noir",
    price: 165000,
    oldPrice: null,
    badge: "Best Seller",
    category: "rough-body",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#1A1208\"/></svg>",
    ]
  },
  {
    id: "sophisticated-honey-bag",
    name: "Sophisticated Honey Bag",
    material: "Smooth Leather \u00b7 Honey",
    price: 135000,
    oldPrice: null,
    badge: null,
    category: "coach",
    featured: false,
    images: [
      "<svg viewBox=\"0 0 240 320\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"320\" fill=\"#EDE5DA\"/></svg>",
    ]
  },
];

// Returns the product catalog. Today: reads the local array above.
// Later (post-backend): replace the body with a fetch to the admin API,
// e.g. `return fetch('https://api.giftijbrandy.com/products').then(r => r.json());`
// Everything that calls getProducts() (both pages' render logic) stays the same.
async function getProducts() {
  return GB_PRODUCTS;
}

async function getFeaturedProducts() {
  const all = await getProducts();
  return all.filter(p => p.featured);
}