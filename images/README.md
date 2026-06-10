# Product photos — drop your real images here

The site looks for a photo at **`images/<product-id>.jpg`** for each product.
Until a photo exists, the site shows an on-brand "photo coming soon" tile
(terracotta gradient + zellige star) — never a random/wrong image.

## How to add a photo
1. Save your photo as a `.jpg` using the exact filename below.
2. Put it in this `images/` folder.
3. Commit & push — it goes live automatically:
   ```
   git -C "d:\files" add images
   git -C "d:\files" commit -m "Add product photos"
   git -C "d:\files" push
   ```

**Recommended:** portrait orientation, ~1000×1250px or larger, well-lit on a clean
background, file size under ~400 KB each (compress with squoosh.app or tinypng.com).

## Filenames the site expects

| Product | Filename to use |
|---------|-----------------|
| Atlas Leather Pouf | `atlas-leather-pouf.jpg` |
| Pierced Brass Lantern | `pierced-brass-lantern.jpg` |
| Handmade Babouches | `handmade-babouches.jpg` |
| Glazed Cooking Tagine | `glazed-cooking-tagine.jpg` |
| Woven Souk Basket | `woven-souk-basket.jpg` |
| Beni Ourain Berber Rug | `beni-ourain-rug.jpg` |
| Pure Argan Oil | `pure-argan-oil.jpg` |
| Hand-Embroidered Cushion | `embroidered-cushion.jpg` |
| Hand-Stitched Leather Tote | `hand-stitched-tote.jpg` |
| Damask Rose Water | `damask-rose-water.jpg` |
| Beldi Black Soap | `beldi-black-soap.jpg` |
| Azilal Berber Rug | `azilal-rug.jpg` |

## Multiple photos per product ✦ NEW

A product can now show **several photos** — the product page turns into a gallery with
thumbnails, ‹ › arrows, a counter, and swipe on phones. The first photo is the "main" one
shown on the shop cards and in the cart.

**Easiest — in the CMS (app.pagescms.org):** each product now has a **"Photos"** field.
Click it, upload as many photos as you like, drag to reorder. Done.

**Or by hand — in `data/products.json`:** add an `images` array to the product:
```json
{
  "id": "atlas-leather-pouf",
  "name": "Atlas Leather Pouf",
  "images": [
    "images/atlas-leather-pouf.jpg",
    "images/atlas-leather-pouf-2.jpg",
    "images/atlas-leather-pouf-3.jpg"
  ],
  ...
}
```
then drop those files in this folder and push. Any filenames work — just match the paths.
A product with only one photo (or none yet) still works exactly as before.

## Notes
- Filenames are **case-sensitive** on the live server — use lowercase.
- Photos of **any shape** now display in full (the gallery fits wide rugs, tall bottles and
  square poufs without cropping), and the whole site adapts from phone to wide desktop.
- The product id ↔ filename mapping lives in `js/asli.js` (the `id` field of each product).
