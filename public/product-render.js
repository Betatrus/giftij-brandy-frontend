// ════════════════════════════════════════════════════════
// GIFTIJ BRANDY — SHARED PRODUCT CARD RENDERER
// Used by both index1.html (featured only) and shop.html (full catalog).
// Requires products-data.js to be loaded first (defines GB_PRODUCTS,
// getProducts(), getFeaturedProducts()).
//
// SPEC-IMAGE DOTS: each product has an `images` array. If a vendor has
// uploaded more than one photo/spec for a product, images.length > 1 and
// dots render automatically — one per image — signalling to the customer
// that there's more to see. Tapping a dot (or swiping the image on mobile)
// switches the photo and updates the active dot. Products with only one
// image show no dots at all. This is entirely data-driven: add a photo in
// the admin later, a dot appears here automatically — no markup changes.
// ════════════════════════════════════════════════════════

function gbFmtPrice(n){ return '₦' + n.toLocaleString('en-NG'); }

function gbBadgeClass(badge){
  if(!badge) return '';
  const b = badge.toLowerCase();
  if(b.includes('best')) return 'badge-best';
  if(b.includes('new')) return 'badge-new';
  if(b.includes('sale')) return 'badge-sale';
  if(b.includes('fave') || b.includes('fan')) return 'badge-best';
  return 'badge-new';
}

// Builds one product card's HTML. `context` is 'shop' or 'home' in case the
// two pages ever need slightly different affordances later (currently identical).
function gbRenderCard(p, context){
  const hasMultiSpec = p.images && p.images.length > 1;
  const badgeHtml = p.badge ? `<span class="product-badge ${gbBadgeClass(p.badge)}">${p.badge}</span>` : '';
  const oldPriceHtml = p.oldPrice ? `<span class="product-price-old">${gbFmtPrice(p.oldPrice)}</span>` : '';

  // Always render the dots slot so card layout stays uniform across the
  // grid — it's just visually empty for single-image products. The moment
  // an admin uploads a 2nd/3rd spec photo for that product, dots appear
  // here automatically with no layout shift for neighboring cards.
  const dotsHtml = `<div class="spec-dots" role="tablist" aria-label="More views of ${p.name}">` +
      (hasMultiSpec ? p.images.map((_, i) => `<div class="spec-dot${i===0?' active':''}" data-idx="${i}" onclick="gbChangeSpec(this,'${p.id}')"></div>`).join('') : '') +
    `</div>`;

  return `
  <div class="product-card" data-cat="${p.category}" data-price="${p.price}" data-product-id="${p.id}">
    <div class="product-img-wrap" ${hasMultiSpec ? `ontouchstart="gbSpecTouchStart(event)" ontouchend="gbSpecTouchEnd(event,'${p.id}')"` : ''}>
      ${badgeHtml}
      <div class="product-img-frame" data-current-img="0">${p.images[0]}</div>
      <button class="product-wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
      <div class="product-add-area">
        <button class="quick-add-btn" onclick="addToCart(this,'${p.name.replace(/'/g,"\\'")}',${p.price},'${p.material.replace(/'/g,"\\'")}')">QUICK ADD TO BAG</button>
        <div class="qty-controls"><button class="qty-btn" onclick="deskQty(this,-1)">−</button><span class="qty-num">1</span><button class="qty-btn" onclick="deskQty(this,1)">+</button><button class="qty-remove-btn" onclick="deskRemove(this)">Remove</button></div>
      </div>
    </div>
    <p class="product-name">${p.name}</p>
    <p class="product-material">${p.material}</p>
    <div class="product-price-row"><span class="product-price">${gbFmtPrice(p.price)}</span>${oldPriceHtml}</div>
    ${dotsHtml}
    <div class="mob-add-wrap">
      <button class="mob-add-btn" onclick="mobAdd(this,'${p.name.replace(/'/g,"\\'")}',${p.price},'${p.material.replace(/'/g,"\\'")}')">Add to Bag</button>
      <div class="mob-qty-row"><button class="mob-qty-btn" onclick="mobQty(this,-1)">−</button><span class="mob-qty-num">1</span><button class="mob-qty-btn" onclick="mobQty(this,1)">+</button></div>
    </div>
  </div>`;
}

async function gbRenderGrid(containerId, opts){
  opts = opts || {};
  const container = document.getElementById(containerId);
  if(!container) return;
  const products = opts.featuredOnly ? await getFeaturedProducts() : await getProducts();
  container.innerHTML = products.map(p => gbRenderCard(p, opts.context||'shop')).join('');
}

// ── Spec-image dot interaction ──────────────────────────────────────────
function gbChangeSpec(dot, productId){
  const card = dot.closest('.product-card');
  const frame = card.querySelector('.product-img-frame');
  const dots = dot.closest('.spec-dots');
  const idx = parseInt(dot.dataset.idx, 10);

  getProducts().then(all => {
    const p = all.find(x => x.id === productId);
    if(!p || !p.images[idx]) return;
    frame.innerHTML = p.images[idx];
    frame.dataset.currentImg = idx;
    dots.querySelectorAll('.spec-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
}

// ── Basic swipe support on mobile product images ────────────────────────
let gbTouchStartX = 0;
function gbSpecTouchStart(e){ gbTouchStartX = e.changedTouches[0].clientX; }
function gbSpecTouchEnd(e, productId){
  const dx = e.changedTouches[0].clientX - gbTouchStartX;
  if(Math.abs(dx) < 40) return; // not a real swipe
  const card = e.currentTarget.closest('.product-card');
  const dots = card.querySelectorAll('.spec-dot');
  if(!dots.length) return;
  const frame = card.querySelector('.product-img-frame');
  let current = parseInt(frame.dataset.currentImg || '0', 10);
  current = dx < 0 ? Math.min(current+1, dots.length-1) : Math.max(current-1, 0);
  dots[current].click();
}
