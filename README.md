# Aṣli · ⴰⵚⵍⵉ

**Authentic Amazigh (Berber) & Moroccan handicrafts — e-commerce site.**

Aṣli (ⴰⵚⵍⵉ, meaning *"authentic / original"* in Tamazight) sells leather poufs, babouches,
brass lanterns, ceramic tagines, woven baskets, Beni Ourain rugs, argan oil and embroidered
cushions — sourced directly from Amazigh artisans across the Atlas, Marrakech, Fes and
Essaouira, and shipped worldwide from Morocco.

This repository is the **Phase 1 static demo**: a fully clickable storefront used to gather
feedback from friends, family and potential customers before the real backend is built.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, featured products, story, categories, artisan spotlight, newsletter |
| `shop.html` | Full catalogue with craft filters, region filter and sorting |
| `product-page.html` | Product detail page — dynamic, opened via `?id=<product-id>` (every product uses it) |
| `cart.html` | Shopping cart — quantities, remove, free-shipping progress, totals |
| `checkout.html` | Checkout form + order summary + confirmation (demo only — see below) |
| `contact.html` | Contact form, locations and FAQ |
| `heritage.html` | Amazigh heritage — Tifinagh symbols, the four regions, a 3,000-year timeline |
| `404.html` | Branded "page not found" |

**How they link:** the sticky nav and footer connect every page. The homepage and shop link to
`product-page.html?id=…`; "Add to cart" / "Quick add" open a slide-in cart drawer; the drawer and
cart lead to checkout. All navigation is relative, so it works locally and when deployed.

## Tech stack

- **Vanilla HTML / CSS / JS** — no framework, no build step.
- `css/asli.css` — the shared design system (colours, type, zellige patterns, arches, components).
- `js/asli.js` — the store engine: product catalogue, a `localStorage` cart, the cart drawer,
  toasts, mobile menu, form handling and scroll-reveal. Loaded on every page.
- **Google Fonts:** Fraunces (serif display), Manrope (body), Noto Sans Tifinagh (ⵜⵉⴼⵉⵏⴰⵖ script).
- **Design language:** cream/terracotta/emerald palette, zellige 8-pointed-star SVG patterns,
  Moorish horseshoe arches, bilingual English + Tifinagh labels, grain texture overlay.

## Placeholders & demo limitations

- **Photos** are temporary placeholders loaded from [loremflickr.com](https://loremflickr.com)
  (they require an internet connection to display). They will be replaced with real product
  photography from a local `/images` folder.
- **Checkout and the contact form are front-end demos.** No card is charged and no email/order
  is sent — both pages say so on screen. The cart is real and persists in the browser.

## Run locally

Because the fonts and placeholder images load over the internet, view it with an internet
connection. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder (recommended), e.g. `python -m http.server` then visit
  `http://localhost:8000/`, or use the VS Code **Live Server** extension.

## Deployment

Hosted as a static site on **Netlify**. `index.html` is served at `/`. Clean URLs are configured
in `_redirects` (e.g. `/shop`, `/product`, `/heritage`). `404.html` is served for unknown paths.

## Roadmap

- **Phase 1 (now):** static demo for feedback. ✅
- **Phase 2:** migrate to **Shopify** for real products, cart, payments and order management
  (replacing the demo cart/checkout). Add real product photography. Optional multilingual
  support (EN / FR / AR / Tamazight).

---

© 2026 Aṣli · Made with love in Casablanca · ⵜⴰⵏⵎⵎⵉⵔⵜ (thank you)
