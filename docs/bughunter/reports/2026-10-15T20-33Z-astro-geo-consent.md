# Astro example — geo-aware cookie consent and GTM startup

- **Audit date:** 2026-10-15 UTC
- **Repository/base:** `qrati-labs/qrati-connect-astro-example`, base `main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`
- **Branch:** `bughunter/astro-workflow-20261015`
- **Workflow:** determine whether cookie consent is required by visitor location, initialize the consent UI, and start Google Tag Manager (GTM).
- **Outcome:** fixed a medium-severity consent-default defect; added a regression test and a test command.

## Flow and bounded scope

The Astro page (`src/pages/index.astro`) calls `initGtm()` immediately, then asynchronously requests `checkConsentRequired()`. That function reads the session cache or calls `/api/cookie-consent-geo` on qrati.com, treating failed requests as consent-required. The adjacent `qrati-web` endpoint calls `requiresCookieConsent()`, whose unknown-location fallback also returns `true`. The page passes that result to `ensureCookieConsentInitialized()`: opt-in regions remain denied until a choice; a non-required region is granted by `updateGtagConsent()`.

The audit included the page call site and cookie/GTM module, the qrati.com geo endpoint and country-selection helper/tests, plus the Google consent initialization guidance. It excluded the unrelated widget embed/theme flow and unrelated routes in the web application. The cross-repository endpoint contract was inspected read-only; no external repositories were changed.

## Finding and correction

**Medium — GTM started with globally granted consent before the geo decision completed.** `src/pages/index.astro:564-567` starts GTM before the asynchronous geo check. Previously, `src/lib/cookieConsent.ts` issued a global `granted` default and then overrode only a hard-coded country list with `denied`. The server endpoint deliberately returns `required: true` if it cannot determine location, but that safe UI fallback did not revoke the already-issued global grant. This could permit consent-dependent tag behavior when location is unknown or when the consent-required jurisdiction set expands beyond the client-side region list. Google documents that defaults must precede measurement tags and shows denied defaults before the user grants consent.[1]

The default is now `denied` for all four consent categories before GTM is appended. The existing explicit `update` path still grants categories when the resolved region does not require opt-in. This removes the duplicate region-only default and makes the client fail closed when geo resolution fails.

## Tests and evidence

- **Added:** `test/cookieConsent.test.js` checks that all four consent categories are denied before the GTM script is appended.
- **RED:** ran `node --experimental-strip-types --test test/cookieConsent.test.js` before the fix; it failed because all four values were `granted` instead of `denied`.
- **GREEN:** `corepack pnpm test` — 1 test passed, 0 failed.
- **Build:** `corepack pnpm build` — passed; Astro emitted one existing CSS warning that the Google Fonts `@import` follows CSS rules in generated styles.
- **Unit/integration/E2E:** unit regression test added; no integration or browser E2E test exists for the full page → geo endpoint → CMP/GTM wiring, so those layers remain unverified by automation.
- **Coverage:** not measured.
- **Performance:** not measured; this change does not add requests or alter the geo lookup path.
- **Diff hygiene:** `git diff --check` passed.

## Recommendations

Add a browser-level test with geo-success, geo-required, and geo-request-failure cases when this demo gains an E2E harness. Keep the server's country policy as the source of truth and avoid relying on a separate browser region list for the initial consent state.

## Research

The Google Tag Platform consent guide recommends setting consent defaults before measurement activity, and documents denied defaults followed by consent updates.[1]

## PR state

PR: https://github.com/qrati-labs/qrati-connect-astro-example/pull/3. The branch is hosted on the agent fork because the upstream repository ruleset denies direct branch creation. Current head and check state are recorded in the tracker after publication.

## Sources

[1] https://developers.google.com/tag-platform/security/guides/consent — Google Tag Platform: Set up consent mode on websites
