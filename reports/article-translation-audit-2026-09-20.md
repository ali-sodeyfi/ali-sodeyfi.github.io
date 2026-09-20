# Article Translation Audit — 2026-09-20

## Scope

- Repository: `main` of `https://github.com/ali-sodeyfi/ali-sodeyfi.github.io.git`
- Source data: `script.js` (`articleCatalog`, `articleEssays`)
- Generator: `scripts/generate-article-pages.mjs`
- Rendered output: `articles/{slug}/{fa,en,ar}/index.html`
- Count: 39 articles and 117 localized article pages

## Findings and corrections

- The first audit found 7 Persian essays below the requested source-data minimum of 5 paragraphs and 7 Persian takeaways sets below 5 items, across the same 7 articles: `Do Things that Don't Scale`, `Startup = Growth`, `1,000 True Fans`, `The Only Thing that Matters`, `Good Product Manager/Bad Product Manager`, `How Superhuman Built an Engine to Find Product Market Fit`, and `Product-User Fit Comes Before Product-Market Fit`.
- Added article-specific Persian paragraphs and executable takeaways rather than relying on generic expansion text.
- Replaced mixed or literal wording in Persian and Arabic, including `scalable`, `onboarding`, `insight`, `DNA`, `creator`, `niche`, `venture-scale`, and the Arabic description of founder mode.
- Added practical distinctions around repeat behavior, market pull, product-user fit, PM ownership, and manual early-stage work in the affected English and Arabic adaptations where needed for cross-language parity.
- Final source-data audit: 0 below-minimum findings.
- Final rendered-page audit: 0 findings for missing translation note, takeaways, direction, source link, forbidden frame, owner name in article body, or paragraph/takeaway minimums.
- Syntax and data checks passed: `node --check` for both JavaScript files, JSON parse for `content-overrides.json`, generated count of 117 pages, and `git diff --check`.
- Static QA passed for representative `fa`, `en`, and `ar` pages: correct root direction, readable article-body/takeaways structure, source-link propagation, no owner name in body, and no iframe/original-article-frame. Chrome screenshot QA was attempted at 390px and 768px but sandbox restrictions prevented Chrome from starting reliably.

## Source verification limitation

The VM could not resolve the external source domains during this run (`curl` returned DNS error `Could not resolve host` for all 39 source URLs). Metadata URLs were checked for presence and exact propagation into generated pages, but live source-text comparison could not be honestly claimed. Human review against the original sources remains required when outbound DNS is available.

## Delivery status

The working tree contains the changes, but commit creation failed because the repository's `.git` directory is mounted read-only (`Unable to create .git/index.lock`). No push or deploy was performed. The monthly wrapper and systemd unit/timer proposal are present in `scripts/`, but no timer is active.
