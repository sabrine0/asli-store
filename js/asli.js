/* =============================================================
   AṢLI · ⴰⵚⵍⵉ — Shared store engine
   Catalog data · localStorage cart · cart drawer · toasts ·
   mobile menu · add-to-cart wiring · forms · scroll reveal.
   Loaded on every page. No build step, no dependencies.
   ============================================================= */
(function () {
  'use strict';

  var ASLI = (window.ASLI = window.ASLI || {});

  /* ---------- config ---------- */
  ASLI.FREE_SHIP = 150;        // free DHL over this (USD)
  ASLI.SHIP_FLAT = 18;         // estimated standard DHL otherwise
  var CART_KEY = 'asli_cart_v1';

  /* ---------- product catalog ----------
     Each product can carry optional rich fields (description, colors,
     sizes, details, artisan) used by the dynamic product page. Cards,
     cart, drawer and shop all read from this single source.            */
  ASLI.products = [
    {
      id: 'atlas-leather-pouf',
      name: 'Atlas Leather Pouf',
      region: 'Marrakech',
      price: 89,
      category: 'Leather & Stitching',
      catTf: 'ⴰⵍⵎ',
      badge: 'Bestseller',
      kw: 'moroccan,leather,pouf,ottoman',
      lock: 11,
      priceNote: 'unstuffed · ships flat',
      blurb: 'Hand-stitched sheep leather, henna-dyed in small batches. Ships flat — you fill it at home.',
      description: 'Hand-stitched in a small workshop in the Marrakech medina by master leather artisan <strong>Mohammed Tazi</strong>. Naturally tanned sheep leather, henna-dyed in small batches. Ships flat — you fill it with old clothes, blankets, or polyester stuffing (about 12–15 kg).',
      colors: [
        { name: 'Saharan Sand', css: 'linear-gradient(135deg, #D4A574, #B5824A)' },
        { name: 'Atlas Charcoal', css: 'linear-gradient(135deg, #3A2818, #1A0F08)' },
        { name: 'Marrakech Terracotta', css: 'linear-gradient(135deg, #C44E2C, #7E2310)' },
        { name: 'Saffron Gold', css: 'linear-gradient(135deg, #D9A12D, #8A6422)' }
      ],
      sizes: ['Small · 40cm', 'Standard · 50cm', 'Large · 60cm'],
      defaultSize: 1,
      details: [
        { title: 'Materials & care', list: [
          '100% natural sheep leather, tanned without chromium',
          'Henna and indigo natural dyes — colors may vary slightly',
          'Hand-stitched with waxed cotton thread',
          'Wipe clean with a damp cloth · do not soak',
          'Apply natural leather conditioner every 6 months'
        ]},
        { title: 'How to stuff your pouf', text: 'Your pouf ships unstuffed to keep shipping affordable. Fill it through the bottom zipper with old t-shirts, towels, blankets, or about 12–15 kg of polyester filling. It takes about 15 minutes — fill firmly so it holds its shape.' },
        { title: 'The artisan’s story', text: 'Mohammed Tazi has worked leather in the Marrakech medina for 27 years. His workshop near the Bahia Palace produces around 8 poufs per week, each entirely by hand. We pay him 3× the local market rate and source his leather from a small tannery in Fes.' }
      ],
      artisan: {
        name: 'Mohammed Tazi', tf: 'ⴰⵎⵙⵏⴰⵍ', region: 'Marrakech',
        kw: 'moroccan,leather,artisan,worker', lock: 199,
        bio1: 'Mohammed’s small workshop sits in a forgotten alley behind the Bahia Palace. He works alone, six days a week, producing around eight poufs and a handful of bags. We met him in 2024 and he became our first leather partner.',
        bio2: 'Every piece you order is made specifically for you — no warehouse, no overstock. Your pouf will leave his hands within 5–7 days of your order.',
        stats: [{ n: '27', label: 'Years of craft' }, { n: '3×', label: 'Local market wage' }, { n: '8', label: 'Pieces per week' }]
      }
    },
    {
      id: 'pierced-brass-lantern', name: 'Pierced Brass Lantern', region: 'Fes', price: 74,
      category: 'Home & Decor', catTf: 'ⵜⴰⴷⴷⴰⵔⵜ', badge: '', kw: 'moroccan,brass,lantern', lock: 22,
      priceNote: 'hand-pierced brass',
      blurb: 'Hand-pierced in the Fes medina, casting filigree shadows across the room when lit.',
      description: 'Hand-pierced brass lantern from the metalworkers of the Fes medina, using techniques unchanged since the Marinid era. Each one throws intricate filigree shadows across walls and ceiling when lit. Fits a standard tea light or small LED candle.'
    },
    {
      id: 'handmade-babouches', name: 'Handmade Babouches', region: 'Tangier', price: 42,
      category: 'Leather & Stitching', catTf: 'ⴰⵍⵎ', badge: 'New', kw: 'babouches,moroccan,slippers', lock: 33,
      priceNote: 'unisex · true to size',
      blurb: 'Soft hand-stitched leather slippers, dyed with saffron and pomegranate.',
      description: 'Traditional Moroccan babouches, hand-stitched from supple goat leather and dyed with saffron and pomegranate skin. Worn indoors and out for centuries across the Maghreb. Unisex sizing — they soften and mould to your foot within days.',
      sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'], defaultSize: 3
    },
    {
      id: 'glazed-cooking-tagine', name: 'Glazed Cooking Tagine', region: 'Safi', price: 58,
      category: 'Home & Decor', catTf: 'ⵜⴰⴷⴷⴰⵔⵜ', badge: '', kw: 'tagine,moroccan,ceramic', lock: 44,
      priceNote: 'oven & flame safe',
      blurb: 'A real cooking tagine from Safi, Morocco’s pottery capital — not a decorative one.',
      description: 'A true cooking tagine — not a decorative piece — thrown and glazed by potters in Safi, Morocco’s ceramic capital. The conical lid circulates steam to slow-cook meat and vegetables with almost no water. Season it before first use; safe on a diffuser over flame or in the oven.'
    },
    {
      id: 'woven-souk-basket', name: 'Woven Souk Basket', region: 'Salé', price: 36,
      category: 'Home & Decor', catTf: 'ⵜⴰⴷⴷⴰⵔⵜ', badge: '', kw: 'moroccan,basket,straw,bag', lock: 55,
      priceNote: 'palm leaf · leather handles',
      blurb: 'Hand-woven palm-leaf basket with stitched leather handles. Market bag or home storage.',
      description: 'Hand-woven from doum palm leaf by weavers in Salé, finished with hand-stitched leather handles. Equally at home as a market bag, a beach tote, or storage for blankets and toys. Each one is unique in weave and tone.'
    },
    {
      id: 'beni-ourain-rug', name: 'Beni Ourain Berber Rug', region: 'Atlas Mountains', price: 640,
      category: 'Rugs', catTf: 'ⵜⴰⵣⵔⴱⵉⵜ', badge: 'Limited', kw: 'beni,ourain,rug,berber', lock: 66,
      priceNote: 'one of a kind · ~2 × 3 m',
      blurb: 'Undyed wool, hand-knotted over 30–90 days by women of the Aït Bouguemez valley.',
      description: 'A genuine Beni Ourain rug, hand-knotted from undyed Atlas sheep wool by women of the Aït Bouguemez valley. The diamond and line motifs are personal — woven from memory, never copied. Each rug takes between 30 and 90 days. No two are alike, and once one is gone it cannot be remade.',
      artisan: {
        name: 'Fatima Z.', tf: 'ⴼⴰⵟⵉⵎⴰ', region: 'Aït Bouguemez',
        kw: 'moroccan,berber,woman,weaver', lock: 99,
        bio1: 'Fatima has been weaving Beni Ourain rugs since she was seven, taught by her grandmother high in the Atlas. Each rug takes between 30 and 90 days — a single mistake means starting over.',
        bio2: 'She works within a women’s cooperative that we pay directly, with no middlemen between her loom and your floor.',
        stats: [{ n: '32', label: 'Years weaving' }, { n: '30–90', label: 'Days per rug' }, { n: '100%', label: 'Undyed wool' }]
      }
    },
    {
      id: 'pure-argan-oil', name: 'Pure Argan Oil', region: 'Essaouira', price: 28,
      category: 'Beauty & Rituals', catTf: 'ⵜⴰⵣⴻⵍⵍⵉⵜ', badge: '', kw: 'argan,oil,bottle,cosmetic', lock: 77,
      priceNote: '50ml · cold-pressed',
      blurb: 'Cold-pressed cosmetic argan oil from a women’s cooperative near Essaouira.',
      description: 'Cold-pressed cosmetic-grade argan oil from a women’s cooperative near Essaouira, where the argan tree grows nowhere else on earth. Unroasted and unscented, for skin, hair and nails. 50 ml amber glass bottle with dropper.'
    },
    {
      id: 'embroidered-cushion', name: 'Hand-Embroidered Cushion', region: 'Chefchaouen', price: 48,
      category: 'Home & Decor', catTf: 'ⵜⴰⴷⴷⴰⵔⵜ', badge: '', kw: 'moroccan,embroidered,cushion,pillow', lock: 88,
      priceNote: 'cover only · 45 × 45 cm',
      blurb: 'Cotton cushion cover with fassi-style hand embroidery from the blue city.',
      description: 'A cotton cushion cover hand-embroidered in the fassi tradition by artisans in blue-walled Chefchaouen. Hidden zip, 45 × 45 cm, cover only. Each takes two to three days of needlework.'
    },
    {
      id: 'hand-stitched-tote', name: 'Hand-Stitched Leather Tote', region: 'Marrakech', price: 95,
      category: 'Leather & Stitching', catTf: 'ⴰⵍⵎ', badge: '', kw: 'moroccan,leather,bag,tote', lock: 202,
      priceNote: 'full-grain · unlined',
      blurb: 'Roomy full-grain leather tote, saddle-stitched by hand in the medina.',
      description: 'A roomy, unlined full-grain leather tote, saddle-stitched entirely by hand in the Marrakech medina. It starts firm and develops a deep patina with use. Fits a 13" laptop, a market haul, or a weekend away.'
    },
    {
      id: 'damask-rose-water', name: 'Damask Rose Water', region: 'Kelaat M’Gouna', price: 22,
      category: 'Beauty & Rituals', catTf: 'ⵜⴰⵣⴻⵍⵍⵉⵜ', badge: '', kw: 'rose,water,bottle,cosmetic', lock: 205,
      priceNote: '100ml · steam-distilled',
      blurb: 'Steam-distilled from Damask roses in the Valley of Roses. A toner and a ritual.',
      description: 'Steam-distilled from Damask roses harvested at dawn in the Valley of Roses (Kelaat M’Gouna). A gentle facial toner and a centuries-old ritual mist. Nothing added — just rose and water. 100 ml glass bottle.'
    },
    {
      id: 'beldi-black-soap', name: 'Beldi Black Soap', region: 'Fes', price: 18,
      category: 'Beauty & Rituals', catTf: 'ⵜⴰⵣⴻⵍⵍⵉⵜ', badge: '', kw: 'soap,natural,spa,olive', lock: 206,
      priceNote: '200g · with kessa glove',
      blurb: 'The olive-based hammam soap, traditionally paired with a kessa exfoliating glove.',
      description: 'Beldi black soap — the soft, olive-based paste at the heart of the Moroccan hammam ritual. Massage on, leave a few minutes, then scrub with the included kessa glove. Leaves skin remarkably smooth. 200 g jar.'
    },
    {
      id: 'azilal-rug', name: 'Azilal Berber Rug', region: 'Azilal', price: 520,
      category: 'Rugs', catTf: 'ⵜⴰⵣⵔⴱⵉⵜ', badge: '', kw: 'azilal,berber,rug,colorful', lock: 207,
      priceNote: 'one of a kind · ~1.5 × 2.5 m',
      blurb: 'A wilder cousin of the Beni Ourain — abstract, colourful, full of story.',
      description: 'Azilal rugs are the wilder, more colourful cousins of the Beni Ourain — woven on a natural wool ground with bursts of dyed thread arranged from imagination, not pattern. Each is a one-of-a-kind diary of its weaver. Roughly 1.5 × 2.5 m.'
    }
  ];

  /* ---------- helpers ---------- */
  ASLI.IMG_DIR = 'images/';

  // Branded SVG placeholder shown only until a real photo exists at images/<id>.jpg.
  ASLI.fallbackImg = function (label) {
    label = String(label || 'Aṣli').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
          "<stop offset='0' stop-color='#C99240'/><stop offset='0.55' stop-color='#B5391C'/><stop offset='1' stop-color='#6D1B12'/>" +
        "</linearGradient></defs>" +
        "<rect width='400' height='500' fill='url(#g)'/>" +
        "<g fill='none' stroke='#F7EFDF' stroke-width='1' opacity='0.18'>" +
          "<rect x='158' y='150' width='84' height='84'/>" +
          "<rect x='158' y='150' width='84' height='84' transform='rotate(45 200 192)'/>" +
        "</g>" +
        "<text x='200' y='322' text-anchor='middle' font-family='Georgia,serif' font-style='italic' font-size='22' fill='#F7EFDF'>" + label + "</text>" +
        "<text x='200' y='432' text-anchor='middle' font-family='Arial,sans-serif' font-size='11' letter-spacing='3' fill='#F7EFDF' opacity='0.7'>PHOTO COMING SOON</text>" +
      "</svg>";
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  };

  // Build keyword -> product map once, so legacy imgUrl(kw,...) calls resolve to local photos.
  var _kwMap = null;
  function kwMap() { if (!_kwMap) { _kwMap = {}; ASLI.products.forEach(function (p) { _kwMap[p.kw] = p; }); } return _kwMap; }

  // Real product photo: drop a file at images/<id>.jpg (or set product.image) and it shows automatically.
  ASLI.productImg = function (p) { return p ? (p.image || ASLI.IMG_DIR + p.id + '.jpg') : ASLI.fallbackImg(); };

  // Back-compat shim — existing pages call imgUrl(kw, lock, w, h). Resolve to the local
  // product photo when keywords match a product, otherwise a branded placeholder.
  ASLI.imgUrl = function (kw, lock, w, h) {
    var p = kwMap()[kw];
    return p ? ASLI.productImg(p) : ASLI.fallbackImg();
  };
  ASLI.getProduct = function (id) {
    for (var i = 0; i < ASLI.products.length; i++) if (ASLI.products[i].id === id) return ASLI.products[i];
    return null;
  };
  ASLI.getRelated = function (id, n) {
    var base = ASLI.getProduct(id);
    var same = ASLI.products.filter(function (p) { return p.id !== id && base && p.category === base.category; });
    var rest = ASLI.products.filter(function (p) { return p.id !== id && (!base || p.category !== base.category); });
    return same.concat(rest).slice(0, n || 4);
  };
  ASLI.money = function (n) {
    n = Math.round((Number(n) || 0) * 100) / 100;
    var whole = n % 1 === 0;
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 });
  };
  ASLI.categories = function () {
    var seen = {}, out = [];
    ASLI.products.forEach(function (p) { if (!seen[p.category]) { seen[p.category] = 1; out.push(p.category); } });
    return out;
  };
  ASLI.regions = function () {
    var seen = {}, out = [];
    ASLI.products.forEach(function (p) { if (!seen[p.region]) { seen[p.region] = 1; out.push(p.region); } });
    return out.sort();
  };

  /* ---------- cart (localStorage) ---------- */
  function read() {
    try { var v = JSON.parse(localStorage.getItem(CART_KEY)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function write(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('asli:cart', { detail: { items: items } }));
  }

  ASLI.cart = {
    get: read,
    save: write,
    count: function () { return read().reduce(function (s, l) { return s + l.qty; }, 0); },
    subtotal: function () {
      return read().reduce(function (s, l) {
        var p = ASLI.getProduct(l.id); return s + (p ? p.price * l.qty : 0);
      }, 0);
    },
    /* enriched lines with product object attached */
    lines: function () {
      return read().map(function (l) {
        return { id: l.id, qty: l.qty, variant: l.variant || '', product: ASLI.getProduct(l.id) };
      }).filter(function (l) { return l.product; });
    },
    add: function (id, qty, variant) {
      qty = Math.max(1, parseInt(qty || 1, 10));
      variant = variant || '';
      var items = read(), found = false;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id && (items[i].variant || '') === variant) { items[i].qty += qty; found = true; break; }
      }
      if (!found) items.push({ id: id, qty: qty, variant: variant });
      write(items);
    },
    setQty: function (id, variant, qty) {
      variant = variant || ''; qty = parseInt(qty, 10);
      var items = read();
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id && (items[i].variant || '') === variant) {
          if (qty <= 0) { items.splice(i, 1); } else { items[i].qty = qty; }
          break;
        }
      }
      write(items);
    },
    remove: function (id, variant) {
      variant = variant || '';
      write(read().filter(function (l) { return !(l.id === id && (l.variant || '') === variant); }));
    },
    clear: function () { write([]); },
    shipping: function () {
      var sub = ASLI.cart.subtotal();
      if (sub === 0) return 0;
      return sub >= ASLI.FREE_SHIP ? 0 : ASLI.SHIP_FLAT;
    }
  };

  /* ---------- injected UI styles (work even on pages without asli.css) ---------- */
  var UI_CSS = [
    '.asli-overlay{position:fixed;inset:0;background:rgba(26,15,8,.55);opacity:0;visibility:hidden;transition:opacity .35s;z-index:399;backdrop-filter:blur(2px);}',
    '.asli-overlay.open{opacity:1;visibility:visible;}',
    '.asli-drawer{position:fixed;top:0;right:0;height:100%;width:420px;max-width:92vw;background:var(--cream,#F7EFDF);z-index:400;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);box-shadow:-20px 0 60px -20px rgba(26,15,8,.4);}',
    '.asli-drawer.open{transform:translateX(0);}',
    '.asli-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:24px 26px;border-bottom:1px solid var(--line,#C9B68E);}',
    '.asli-drawer-head h2{font-family:"Fraunces",serif;font-weight:500;font-size:1.4rem;display:flex;align-items:baseline;gap:10px;}',
    '.asli-drawer-head .tf{font-family:"Noto Sans Tifinagh",sans-serif;font-size:.95rem;color:var(--terracotta,#B5391C);}',
    '.asli-drawer-close{background:none;border:none;cursor:pointer;font-size:1.5rem;line-height:1;color:var(--ink,#1A0F08);}',
    '.asli-drawer-body{flex:1;overflow-y:auto;padding:8px 26px;}',
    '.asli-drawer-foot{border-top:1px solid var(--line,#C9B68E);padding:22px 26px;background:var(--cream-deep,#EBDFC4);}',
    '.asli-dline{display:grid;grid-template-columns:64px 1fr auto;gap:14px;padding:18px 0;border-bottom:1px solid var(--line,#C9B68E);align-items:start;}',
    '.asli-dline-img{width:64px;height:78px;border-radius:4px;overflow:hidden;background:var(--sand,#E0D0B0);}',
    '.asli-dline-img img{width:100%;height:100%;object-fit:cover;}',
    '.asli-dline-name{font-family:"Fraunces",serif;font-weight:500;font-size:.98rem;line-height:1.2;}',
    '.asli-dline-name a{text-decoration:none;color:inherit;}',
    '.asli-dline-var{font-size:.74rem;color:var(--ink-soft,#5A4632);margin:2px 0 8px;}',
    '.asli-dline-q{display:inline-flex;border:1px solid var(--line,#C9B68E);align-items:center;}',
    '.asli-dline-q button{width:28px;height:28px;border:none;background:none;cursor:pointer;font-size:1rem;color:var(--ink,#1A0F08);font-family:inherit;}',
    '.asli-dline-q span{min-width:26px;text-align:center;font-size:.85rem;font-weight:600;}',
    '.asli-dline-price{font-family:"Fraunces",serif;font-weight:600;color:var(--terracotta,#B5391C);white-space:nowrap;}',
    '.asli-dline-rm{display:block;margin-top:6px;background:none;border:none;cursor:pointer;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft,#5A4632);padding:0;}',
    '.asli-dline-rm:hover{color:var(--terracotta,#B5391C);}',
    '.asli-drawer-empty{text-align:center;padding:60px 10px;color:var(--ink-soft,#5A4632);}',
    '.asli-drawer-empty .tf{display:block;font-family:"Noto Sans Tifinagh",sans-serif;font-size:2rem;color:var(--terracotta,#B5391C);margin-bottom:14px;}',
    '.asli-sub{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;}',
    '.asli-sub .v{font-family:"Fraunces",serif;font-weight:600;font-size:1.4rem;color:var(--terracotta,#B5391C);}',
    '.asli-ship-note{font-size:.76rem;color:var(--ink-soft,#5A4632);margin-bottom:16px;}',
    '.asli-ship-note strong{color:var(--terracotta,#B5391C);}',
    '.asli-drawer-foot .btn{margin-bottom:10px;}',
    '.asli-drawer-foot .asli-viewcart{display:block;text-align:center;font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--ink,#1A0F08);text-decoration:none;}',
    '.asli-drawer-foot .asli-viewcart:hover{color:var(--terracotta,#B5391C);}',
    /* toast */
    '.asli-toasts{position:fixed;left:50%;bottom:30px;transform:translateX(-50%);z-index:500;display:flex;flex-direction:column;gap:10px;align-items:center;pointer-events:none;}',
    '.asli-toast{background:var(--ink,#1A0F08);color:var(--cream,#F7EFDF);padding:14px 22px;font-size:.78rem;letter-spacing:.08em;font-weight:600;display:flex;align-items:center;gap:10px;box-shadow:0 10px 40px -10px rgba(0,0,0,.5);opacity:0;transform:translateY(12px);transition:opacity .3s,transform .3s;max-width:90vw;}',
    '.asli-toast.show{opacity:1;transform:translateY(0);}',
    '.asli-toast .star{color:var(--saffron,#D9A12D);}',
    /* mobile menu + toggle */
    '.nav-toggle{display:none;background:none;border:none;cursor:pointer;color:var(--ink,#1A0F08);padding:4px;}',
    '.nav-toggle svg{width:26px;height:26px;}',
    '.mobile-menu{position:fixed;inset:0;z-index:420;background:var(--cream,#F7EFDF);transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;padding:30px 28px;overflow-y:auto;}',
    '.mobile-menu.open{transform:translateX(0);}',
    '.mobile-menu-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:36px;}',
    '.mobile-menu-close{background:none;border:none;font-size:1.7rem;cursor:pointer;color:var(--ink,#1A0F08);line-height:1;}',
    '.mobile-menu a{font-family:"Fraunces",serif;font-size:1.7rem;padding:15px 0;text-decoration:none;color:var(--ink,#1A0F08);border-bottom:1px solid var(--line,#C9B68E);}',
    '.mobile-menu a:hover{color:var(--terracotta,#B5391C);}',
    '.mobile-menu a .tf{font-family:"Noto Sans Tifinagh",sans-serif;font-size:1rem;color:var(--terracotta,#B5391C);margin-left:10px;}',
    '@media(max-width:640px){.nav-toggle{display:inline-flex;}}'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById('asli-ui-styles')) return;
    var s = document.createElement('style');
    s.id = 'asli-ui-styles';
    s.textContent = UI_CSS;
    document.head.appendChild(s);
  }

  /* ---------- build drawer + overlay + toast host ---------- */
  function buildDrawer() {
    if (document.getElementById('asliDrawer')) return;
    var overlay = document.createElement('div');
    overlay.className = 'asli-overlay';
    overlay.setAttribute('data-asli-close', '');

    var drawer = document.createElement('aside');
    drawer.className = 'asli-drawer';
    drawer.id = 'asliDrawer';
    drawer.setAttribute('aria-label', 'Shopping cart');
    drawer.innerHTML =
      '<div class="asli-drawer-head"><h2>Your cart <span class="tf">ⵜⴰⵙⵙⵉⵍⵜ</span></h2>' +
      '<button class="asli-drawer-close" data-asli-close aria-label="Close cart">×</button></div>' +
      '<div class="asli-drawer-body" id="asliDrawerBody"></div>' +
      '<div class="asli-drawer-foot" id="asliDrawerFoot"></div>';

    var toasts = document.createElement('div');
    toasts.className = 'asli-toasts';
    toasts.id = 'asliToasts';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(toasts);
  }

  function openDrawer() {
    renderDrawer();
    document.querySelector('.asli-overlay').classList.add('open');
    document.getElementById('asliDrawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    var o = document.querySelector('.asli-overlay'); if (o) o.classList.remove('open');
    var d = document.getElementById('asliDrawer'); if (d) d.classList.remove('open');
    document.body.style.overflow = '';
  }
  ASLI.openCart = openDrawer;
  ASLI.closeCart = closeDrawer;

  function renderDrawer() {
    var body = document.getElementById('asliDrawerBody');
    var foot = document.getElementById('asliDrawerFoot');
    if (!body || !foot) return;
    var lines = ASLI.cart.lines();

    if (!lines.length) {
      body.innerHTML = '<div class="asli-drawer-empty"><span class="tf">ⵉⵍⵎ</span>' +
        '<p>Your cart is empty.<br>The souk is waiting.</p></div>';
      foot.innerHTML = '<a href="shop.html" class="btn btn-block">Browse the collection</a>';
      return;
    }

    body.innerHTML = lines.map(function (l) {
      var p = l.product;
      return '<div class="asli-dline" data-line data-id="' + p.id + '" data-variant="' + escAttr(l.variant) + '">' +
        '<div class="asli-dline-img"><img src="' + ASLI.imgUrl(p.kw, p.lock, 160, 200) + '" alt="' + escAttr(p.name) + '"></div>' +
        '<div><div class="asli-dline-name"><a href="product-page.html?id=' + p.id + '">' + p.name + '</a></div>' +
        (l.variant ? '<div class="asli-dline-var">' + l.variant + '</div>' : '<div class="asli-dline-var">' + p.region + '</div>') +
        '<div class="asli-dline-q"><button data-asli-dec aria-label="Decrease">−</button><span>' + l.qty + '</span><button data-asli-inc aria-label="Increase">+</button></div>' +
        '<button class="asli-dline-rm" data-asli-remove>Remove</button></div>' +
        '<div class="asli-dline-price">' + ASLI.money(p.price * l.qty) + '</div>' +
        '</div>';
    }).join('');

    var sub = ASLI.cart.subtotal();
    var freeIn = ASLI.FREE_SHIP - sub;
    var shipNote = sub >= ASLI.FREE_SHIP
      ? 'You’ve unlocked <strong>free worldwide DHL</strong> ✦'
      : 'You’re <strong>' + ASLI.money(freeIn) + '</strong> away from free DHL shipping.';
    foot.innerHTML =
      '<div class="asli-sub"><span>Subtotal</span><span class="v">' + ASLI.money(sub) + '</span></div>' +
      '<div class="asli-ship-note">' + shipNote + '</div>' +
      '<a href="checkout.html" class="btn btn-block">Checkout →</a>' +
      '<a href="cart.html" class="asli-viewcart">View full cart</a>';
  }

  /* ---------- toast ---------- */
  ASLI.toast = function (msg) {
    var host = document.getElementById('asliToasts');
    if (!host) return;
    var t = document.createElement('div');
    t.className = 'asli-toast';
    t.innerHTML = '<span class="star">✦</span>' + msg;
    host.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 350);
    }, 2400);
  };

  /* ---------- cart count badges ---------- */
  function syncCount() {
    var c = ASLI.cart.count();
    document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = c; });
  }

  /* ---------- mobile menu ---------- */
  function buildMobileMenu() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    // ensure a hamburger toggle exists
    var icons = nav.querySelector('.nav-icons');
    var toggle = nav.querySelector('.nav-toggle');
    if (!toggle && icons) {
      toggle = document.createElement('button');
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>';
      icons.appendChild(toggle);
    }
    // build panel from existing nav-links
    if (document.getElementById('asliMobileMenu')) return;
    var links = nav.querySelector('.nav-links');
    var linkHtml = links ? links.innerHTML.replace(/<li>/g, '').replace(/<\/li>/g, '') : '';
    var panel = document.createElement('div');
    panel.className = 'mobile-menu';
    panel.id = 'asliMobileMenu';
    panel.innerHTML =
      '<div class="mobile-menu-head"><div class="logo" style="font-family:\'Fraunces\',serif;font-size:1.6rem;">Aṣli</div>' +
      '<button class="mobile-menu-close" data-asli-menu-close aria-label="Close menu">×</button></div>' +
      linkHtml +
      '<a href="cart.html">Cart <span class="tf">ⵜⴰⵙⵙⵉⵍⵜ</span></a>' +
      '<a href="contact.html">Contact <span class="tf">ⵏⴰⵡⵍ</span></a>';
    document.body.appendChild(panel);

    if (toggle) toggle.addEventListener('click', function () {
      panel.classList.add('open'); document.body.style.overflow = 'hidden';
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('[data-asli-menu-close]') || e.target.tagName === 'A') {
        panel.classList.remove('open'); document.body.style.overflow = '';
      }
    });
  }

  /* ---------- generic accordion (faq + product details) ---------- */
  function wireAccordions() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('.faq-toggle, .detail-toggle');
      if (t) t.parentElement.classList.toggle('open');
    });
  }

  /* ---------- scroll reveal ---------- */
  function wireReveal() {
    var els = document.querySelectorAll('.fade-up');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (el) { if (!el.classList.contains('visible')) io.observe(el); });
  }
  ASLI.observeReveal = wireReveal;

  /* ---------- newsletter forms ---------- */
  function wireNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(function (f) {
      if (f.dataset.asliBound) return;
      f.dataset.asliBound = '1';
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = f.querySelector('button');
        if (btn) { btn.textContent = 'Tanmmirt ✦ Welcome'; }
        var input = f.querySelector('input'); if (input) input.value = '';
        ASLI.toast('Welcome to the medina ✦ ⴰⵣⵓⵍ');
      });
    });
  }

  /* ---------- global delegated clicks ---------- */
  function wireClicks() {
    document.addEventListener('click', function (e) {
      // close drawer / overlay
      if (e.target.closest('[data-asli-close]')) { closeDrawer(); return; }

      // open cart: explicit attr OR nav cart button (the one holding .cart-count)
      var openBtn = e.target.closest('[data-cart-open]');
      if (!openBtn) {
        var navBtn = e.target.closest('.nav-icons button');
        if (navBtn && navBtn.querySelector('.cart-count')) openBtn = navBtn;
      }
      if (openBtn) { e.preventDefault(); openDrawer(); return; }

      // drawer line controls
      var line = e.target.closest('[data-line]');
      if (line) {
        var id = line.dataset.id, variant = line.dataset.variant || '';
        var cur = 0;
        ASLI.cart.get().forEach(function (l) { if (l.id === id && (l.variant || '') === variant) cur = l.qty; });
        if (e.target.closest('[data-asli-inc]')) { ASLI.cart.setQty(id, variant, cur + 1); return; }
        if (e.target.closest('[data-asli-dec]')) { ASLI.cart.setQty(id, variant, cur - 1); return; }
        if (e.target.closest('[data-asli-remove]')) { ASLI.cart.remove(id, variant); return; }
      }

      // add to cart: [data-add] or a .product-quick button inside a [data-id] card
      var add = e.target.closest('[data-add]');
      var quick = e.target.closest('.product-quick');
      if (add || quick) {
        e.preventDefault(); e.stopPropagation();
        var pid = add ? add.getAttribute('data-add') : (quick.closest('[data-id]') ? quick.closest('[data-id]').dataset.id : null);
        if (!pid) return;
        var qty = add && add.dataset.qty ? parseInt(add.dataset.qty, 10) : 1;
        var variant = add && add.dataset.variant ? add.dataset.variant : '';
        var p = ASLI.getProduct(pid);
        ASLI.cart.add(pid, qty, variant);
        ASLI.toast('Added — ' + (p ? p.name : 'item'));
        // brief button feedback for quick-add
        if (quick) { var prev = quick.textContent; quick.textContent = 'Added ✓'; setTimeout(function () { quick.textContent = prev; }, 1400); }
        if (!add || add.getAttribute('data-no-drawer') === null) openDrawer();
      }
    });
  }

  /* ---------- images: replace any stray random-service photos ---------- */
  function fixImages() {
    document.querySelectorAll('img[src*="loremflickr"]').forEach(function (img) {
      if (img.dataset.asliFallback) return;
      img.dataset.asliFallback = '1';
      img.src = ASLI.fallbackImg(img.getAttribute('alt') || 'Aṣli');
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    injectStyles();
    fixImages();
    buildDrawer();
    buildMobileMenu();
    wireClicks();
    wireAccordions();
    wireNewsletter();
    wireReveal();
    syncCount();
    document.addEventListener('asli:cart', function () { syncCount(); renderDrawer(); });
    window.addEventListener('storage', function (e) { if (e.key === CART_KEY) { syncCount(); renderDrawer(); document.dispatchEvent(new CustomEvent('asli:cart', { detail: { items: read() } })); } });
    // Escape closes drawer/menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDrawer(); var mm = document.getElementById('asliMobileMenu'); if (mm) { mm.classList.remove('open'); document.body.style.overflow = ''; } }
    });
  }

  function escAttr(s) { return String(s == null ? '' : s).replace(/"/g, '&quot;'); }
  ASLI.escAttr = escAttr;

  // Catch missing local photos as early as possible (before page scripts set <img> src),
  // so a not-yet-added photo shows the branded placeholder instead of a broken image.
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.asliFallback) return;
    if (String(img.src).indexOf('data:image/svg') === 0) return;
    img.dataset.asliFallback = '1';
    img.src = ASLI.fallbackImg(img.getAttribute('alt') || 'Aṣli');
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
