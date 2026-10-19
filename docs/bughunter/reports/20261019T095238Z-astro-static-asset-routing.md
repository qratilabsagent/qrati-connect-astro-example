# Astro example static asset routing audit

- **Run:** `20261019T095238Z-cabbd1158fe844cbbb67077397f2b4ff`
- **Repository/base:** `qrati-labs/qrati-connect-astro-example`, `origin/main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`.
- **Scope:** Request routing for the published Astro page and static assets through the Worker entry point, Wrangler route, and Cloudflare static-assets binding. Excludes application-level widget loading, consent, theme, SEO content, and remote destination availability.
- **Disposition:** Report-only; no confirmed defect. No issue, source edits, or regression tests.

## Trace and evidence

The site is configured with Astro `base: '/connect/astro-example'` and `outDir: './dist/connect/astro-example'` (`astro.config.mjs:8-9`). Wrangler binds the static-asset directory `./dist` as `ASSETS`, attaches the Worker route `*qrati.com/connect/astro-example*` to zone `qrati.com`, and sets `not_found_handling` to `none` (`wrangler.jsonc:13-23`). The Worker fetch handler forwards the incoming request unchanged to `env.ASSETS.fetch(request)` (`src/worker.ts:5-8`); no rewrite or alternate fallback is implemented there. The README describes the public example at `https://qrati.com/connect/astro-example`.

The configured build output and static asset root preserve the same `/connect/astro-example` path prefix, so the generated page's route and its assets have a consistent directory mapping. The Worker does not rewrite paths or fabricate successful responses for absent assets. This corresponds to the declared static-site deployment model, rather than an SPA fallback or server-rendered route.

Current open PR diffs were reviewed for overlap. PR #7 only adds an outbound-navigation audit; PR #6 is a FAQ audit; PR #5 adjusts best-effort theme preference storage; PR #3 changes cookie-consent/GTM startup. No changed behavior overlaps request-to-static-asset routing.

Cloudflare's static-assets documentation describes static-site generation and HTML handling (including directory/index and trailing-slash behavior): https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/ and https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/. The audit did not perform a deployment or request against production.

## Finding and limits

No confirmed defect in the traced routing configuration or pass-through handler. No severity assigned. The deployment's actual response behavior, live DNS/route attachment, and provider-side asset configuration were not exercised; availability and exact edge behavior remain unverified. No production or external tests were performed.

- Issue: none required (no confirmed finding).
- Tests authored: none; no regression test was indicated by the evidence.
- Tests, builds, lint, type-check, installs, and package-manager commands: **NOT RUN BY BUGHUNTER**.
- The only permitted patch-hygiene check, `git diff --check`, will be recorded after documentation edits.

## Timing (measured wall-clock)

Timing ledger completion pending; final measured phase table and total will be added after PR verification and `bughunter-timing.py finish`. No duration is estimated or backfilled.

## Delivery

PR and checks: pending.
