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
- `git diff --check` passed. No tests, builds, lint, type-check, installs, or package-manager commands were run.

## Timing (measured wall-clock)

| Phase | Segment start (UTC) | Segment end (UTC) | Elapsed |
|---|---|---|---|
| Preflight | 2026-10-19T09:52:39Z | 2026-10-19T09:53:03Z | 00:00:24 |
| Audit | 2026-10-19T09:53:12Z | 2026-10-19T09:54:52Z | 00:01:39 |
| Unclassified interval between marked phases | — | — | 00:00:10 |
| **Total run** | 2026-10-19T09:52:39Z | 2026-10-19T09:54:52Z | **00:02:13** |

IST (UTC+05:30): preflight 15:22:39–15:23:03; audit 15:23:12–15:24:52; total 15:22:39–15:24:52. The 10-second interval is reported as unclassified, not assigned to either phase.

## Delivery

PR #8: https://github.com/qrati-labs/qrati-connect-astro-example/pull/8. At final readback, it is OPEN and MERGEABLE against `main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`; head `4fb945c615cfcb3dbf3e0e55d34748be953f9be2` is published on the authorized `qratilabsagent` fork. Files are this report and `docs/bughunter/INDEX.md`; no closing issue references. At the check snapshot, GitGuardian Security Checks was pending. No merge or deployment.
