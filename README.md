# Meat Market — Static Ordering Website (v1)

Pure HTML/CSS/JavaScript. No backend, no database, no paid APIs. Works on GitHub Pages.

## Files
- `index.html` — page structure
- `style.css` — design
- `app.js` — **CONFIG, PRODUCTS, translations and all logic**
- `images/` — put your photos here (create this folder)

## Deploy on GitHub Pages
1. Create a new GitHub repository and upload all files, keeping `index.html` in the **root**.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After about a minute your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Things to change (top of `app.js`)
- `WHATSAPP_NUMBER` — your WhatsApp Business number, international format, no `+` or spaces (e.g. `9665XXXXXXXX`).
- `CONFIG` — shop name, phone, delivery fee, free-delivery threshold, currency, delivery areas and times.
- `PRODUCTS` — name, Arabic name, description, Arabic description, image, category, tag, price per kg (`price`), optional old price (`was`) and allowed weights (`weights`, in grams).

Prices are entered **per kg**. The website calculates the price for 250 g, 500 g, 1 kg and 2 kg automatically and always shows the weight beside the price.

## Images
The product images are expected at the paths in `PRODUCTS` (for example `images/beef-steak.jpg`) and `images/hero.jpg` for the home banner. **The photos are not included**, so add your own (or change the paths). Until a file exists, a red placeholder with an icon is shown instead. Use photos you own or have a licence for.

## Important limits of version 1
- Orders are **not stored online**. The cart and the latest order are kept in the customer's browser (`localStorage`) only.
- The order reaches you only through the WhatsApp message the customer sends. Confirm each one.
- "Online Payment / Mada" is a **placeholder**. No card data is collected or processed.
- Anyone can edit `app.js` prices in their own browser, so always check the total when you confirm an order.

## Connecting a backend later
- In `app.js`, the submit handler calls `buildOrder()`, which returns a structured `order` object (order number, customer, items, totals, payment, notes). Send that object to your API there (marked with a comment) to get permanent order storage, a customer database, admin dashboard, sales reports, inventory and order status.
- Replace the `PRODUCTS` array with a fetch from your API for inventory.
- Add a payment provider that supports Mada, cards and Apple Pay (e.g. Moyasar, HyperPay, Tap) on the server side.
