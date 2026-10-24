# PickPocket Deals

A free, static Amazon affiliate site hosted on GitHub Pages. No build step, no paid tools.

## Set your affiliate tag
Open `config.js` and replace `YOURTAG-20` with your Amazon Associates tracking ID. Every link on the site updates automatically.

## Add or edit products
Edit `products.js`. Each entry needs a category, an emoji icon, a name, a one-line reason, and either:
- `search: "keywords"` — links to an Amazon search with your tag, or
- `asin: "B0XXXXXXXX"` — links straight to a product page.

## Files
- `index.html` — home page with search and category filters
- `disclosure.html` — required Amazon Associates disclosure
- `privacy.html` — privacy policy
- `styles.css`, `app.js` — design and logic
