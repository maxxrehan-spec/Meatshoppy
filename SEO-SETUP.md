# Tariq Meat Shop automatic product pages

This update adds a generator and an initially non-deploying GitHub workflow. It does not overwrite your source homepage, cart, checkout, Apps Script endpoint, Telegram integration or tracking configuration.

## First publication

1. Commit and push the new `scripts` files and `.github/workflows/seo-pages.yml` together. Do not upload `_site`, preview folders or the temporary test site. Keep all existing website files and images.
2. In GitHub, open **Actions → Build SEO product pages → Run workflow**. Check that build, tests and validation pass. Download the `github-pages` artifact to review the generated site. The deployment job deliberately skips initially.
3. When the preview is approved, change **Settings → Pages → Source** to **GitHub Actions**. Confirm the custom domain remains `tariqmeatshop.com` and HTTPS is enabled. Keep the existing DNS records unchanged.
4. Under **Settings → Secrets and variables → Actions → Variables**, create `SEO_PAGES_DEPLOY` with value `true`. This is a repository variable, not a secret. Run the workflow again and verify the deployment is green.
5. Visit `/products/c1/`, `/ar/products/c1/` and `/sitemap.xml` on your domain. Test the existing cart and checkout without submitting a real order. Resubmit the same sitemap URL in Search Console if needed; use URL Inspection on a product page.

Until step 4, this workflow cannot publish. The existing branch-based Pages process may still publish normal source edits until you switch the source in step 3. Do not leave both publishing systems competing.

## Daily management

- Keep managing the existing published Google Sheet. No private Sheet credentials or Apps Script changes are needed.
- Existing `id` values become permanent URLs: `c1` becomes `/products/c1/` and `/ar/products/c1/`. Change the name freely; never change/reuse its ID. Removing a row removes its pages on the next deployment. For temporary shortages, use `available=no` instead: pages remain with OutOfStock markup.
- An optional `published=no` excludes a row from SEO pages only; it does not change the existing shop's visibility rules. Use the existing `available` setting to stop ordering. Do not add this optional column unless that distinction is intended.
- Supply unique factual English/Arabic descriptions, correct images, unit, weights and prices. `long_desc_en` and `long_desc_ar` are preferred when provided. The generator never invents product claims, reviews or ratings.
- Missing image/description/language content produces a noindex product page omitted from the sitemap. Duplicate IDs, duplicate product name-plus-description, invalid prices or an empty/broken feed stop the build. This is a basic content safeguard, not a guarantee that Google will index every page. Keep variants on the same page rather than duplicating rows.
- Prices use the same rules as your current store: multiple prices correspond to option weights; a single kg price is per kg. Do not put a comma in a decimal number; use a decimal point.
- Existing category and homepage product cards retain their normal product-modal behavior. Their actual links lead to stable product pages, so search engines and new-tab visitors can reach them. Additional category links make the catalog discoverable without JavaScript.

## Automatic synchronization and risks

The workflow runs hourly at minute 23 UTC, on pushes to main and manually. It reads the Sheet afresh and deploys only after successful validation. GitHub schedules can be delayed; they are not instant Sheet edit triggers. Google Sheets publication and Google search results can also lag. For an urgent change, run the workflow manually. Enable GitHub Actions failure notifications and check the workflow periodically; scheduled workflows in inactive public repositories may be disabled by GitHub.

Product pages contain a crawlable build-time snapshot and refresh prices/availability from the public Sheet when opened or revisited. If the live request fails, the timestamped snapshot remains. The existing store independently verifies the live catalog before adding to cart. Google may continue showing older search snippets until it recrawls. No system can promise immediate search-price synchronization.

If a Sheet download, validation or test fails, deployment is skipped and the last published site remains. A valid but mistaken Sheet price still passes validation: check your Sheet carefully. An accidentally shortened but otherwise valid Sheet is not detectable automatically. Keep Sheet version history and backups. Never put private customer information in the public product Sheet.

Generated pages retain the existing GTM container. Do not add a second GA tag. No real order or Telegram message was sent during testing. Generated files use your existing styles; the source storefront design and order logic remain intact.

The `seo-build-report.json` artifact lists incomplete content. At the tested snapshot, product `b9` (Beef Ironed) refers to missing `images/beef-ironed.jpg`; its two language pages are noindex. Upload the correct real image or fix that Sheet filename before indexing it.

## Rollback

Set `SEO_PAGES_DEPLOY` to `false` to stop future deployments. This does not revert the current site. To restore the original publishing process, switch Pages back to **Deploy from a branch**, choose your original main/root source, and trigger a branch deployment. The generator never edits the source website files. Existing generated product URLs will stop resolving after rollback, so use this only to recover from a problem.

## Local validation

Requires Node 22 or newer. From the repository root:

```text
node --test scripts/seo.test.mjs
node scripts/build-seo.mjs . _site
node scripts/check-seo.mjs _site
```

The output directory must be new/empty. Use a different output directory for another build. Never point output at the source repository. For reproducible offline checks, the builder accepts a CSV file path as the fourth command argument.
