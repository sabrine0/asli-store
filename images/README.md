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

## Notes
- Filenames are **case-sensitive** on the live server — use lowercase, exactly as above.
- The product page reuses the same photo for its gallery thumbnails for now. If you want
  multiple angles per product later, tell me and I'll wire up `-1.jpg`, `-2.jpg`, etc.
- The product id ↔ filename mapping lives in `js/asli.js` (the `id` field of each product).
