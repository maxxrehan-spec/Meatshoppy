# Tariq Meat Center — unpublished review preview

Keep `CONFIG.previewOnly: true` until review is complete. Live order submission is disabled. No real test orders or customer messages were sent.

## Integrations

The Google Sheet URL, Apps Script endpoint and existing secret value are unchanged. Orders still POST `{ secret, order }` as text/plain JSON. Customer, items, lines, totals, message and payment fields are retained. The customer mobile is passed through unchanged. The shop contact number is +966 59 668 4625.

The repository contains no Apps Script backend, Telegram or email source. Their behavior cannot be verified here. Success now requires an HTTP-successful JSON response with `ok: true` and a nonempty string `orderNumber`. Check this contract against the actual backend before release.

Failures retain cart/form and never switch to a WhatsApp submission step. Concurrent clicks are guarded. An unchanged retry reuses the client order number within the page session. Backend idempotency still needs checking for reloads, multiple tabs and ambiguous timeouts. The backend must validate prices, availability, location and delivery totals independently of browser values.

## Confirmed delivery rules (latest owner instructions)

- Verified Maps listing: https://maps.app.goo.gl/Y3mNmNyiFn54K2gt9 — مركز طارق للحوم والدواجن خضروات وفواكه فرع 11.
- Listed address: الأدباء، العزيزية، جدة 23342. Shop pin: latitude 21.5590012, longitude 39.2087398. The pin coordinates, not the map camera center, are used as the origin.
- Up to and including 5 km: SAR 10, free only above SAR 50. More than 5 km through 10 km: SAR 15, free only above SAR 200. Over 10 km: SAR 15 + SAR 2 × ceil(distance − 10), with no free threshold. Exactly SAR 50/200 does not qualify. These latest rules supersede earlier tiers.
- Haversine straight-line distance is retained; no paid road-routing service. Unknown customer location means unknown fee, never zero.
- No maximum distance or minimum order was invented. Delivery availability is confirmed with the order on WhatsApp.
- Shop/delivery hours are noon to midnight, Saudi time. Owner-provided expected delivery is within one hour. No automatic rejection outside hours was added because an outside-hours ordering policy was not specified.

## Sheet pricing

Existing columns work unchanged. Optional numeric `old_price` is a previous price in the product's unit. Missing, invalid or non-greater old prices are omitted. No live prices were changed or invented.

For price=20 and old_price=22 per kg, 500 g costs SAR 10.00 with SAR 11.00 crossed out. Quantity multiplies those values. Selected-unit prices are rounded to cents before quantity multiplication; merchandise/final totals are rounded consistently.

Existing comma-separated fixed size prices remain supported: whole chicken 1,000/1,200 g stays SAR 18/20. A scalar old_price is calculated by unit and displayed only where its selected amount exceeds the fixed selling amount. No old size prices are inferred.

Live availability is authoritative. Unavailable rows are omitted; an all-unavailable valid catalogue stays empty. Cached/fallback products cannot be ordered until live availability loads. Existing photo filenames use optimized copies where available; future Sheet images still resolve from images/.

## Business and policy confirmation

The website is renamed Tariq Meat Center, matching the physical shop. About explains the former Meat Market name and links the verified listing/reviews, without copying ratings or testimonials. Genuine shop photographs remain optional and have not been substituted with generated imagery.

Owner-confirmed policies: free cancellation before preparation; cancellation may not be possible after preparation/dispatch; report issues within 24 hours, without limiting statutory rights; refund or replace verified issues; initiate approved refunds within 3 business days, with bank timing variable. Actual final meat/chicken weight determines price, and additional charges require customer approval. The weight-adjustment policy remains on the refund policy page; the repeated checkout notice was removed.

Retention is purpose-based for orders, delivery, support and required recordkeeping, followed by deletion/anonymization. Backend storage, recipient access and deletion implementation still require verification; no automatic backend deletion is claimed. Browser storage remains separately disclosed.

Remaining publication work: inspect Apps Script acknowledgment, duplicate handling, validation and Telegram/email/privacy behavior; review the local preview; then authorize publication. No live orders/messages have been sent.

## Review files

app.js contains the revised logic, index.html the header search and policy links, improvements.css the compact responsive layout, and privacy.html/refunds.html the policy drafts. Original image files are retained alongside images/optimized WebP copies. Serve this folder over local HTTP to review. Publishing and enabling live submissions remain outstanding.

