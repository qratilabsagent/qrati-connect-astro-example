# Astro theme storage failure blocks widget initialization

- Run ID: `20261016T131139Z-8bd273692b154ef4bbfc3b03cdf3450f`
- Repository: `qrati-labs/qrati-connect-astro-example`
- Reviewed base: `origin/main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`
- Workflow boundary: page theme initialization and subsequent embed-script injection.
- Related open PR #3 changes cookie consent files and does not overlap these paths/behavior.

## Finding

**[P2] A blocked localStorage write prevents the widget loader from running.** In `src/pages/index.astro`, the inline theme IIFE calls `applyTheme(getTheme())` at lines 538–539. `applyTheme` writes to `localStorage` at line 535 before the embed loader appends its script at lines 547–555. When storage is unavailable and `setItem` throws (e.g. browser storage restrictions), the exception aborts the IIFE; the Qrati embed script is never appended, so the gallery does not initialize. Theme preference persistence is not required for rendering and should not block it.

- Trigger: page loaded with storage writes throwing.
- Invariant violated: optional theme persistence must not prevent widget startup.
- Impact: affected visitors see no embedded gallery on the example page.
- Confidence: high; direct synchronous execution order is evident in source.

## Disposition

Issue filed and read back: [#4](https://github.com/qrati-labs/qrati-connect-astro-example/issues/4).

Fix: wrap only the theme `localStorage.setItem` call in a try/catch; UI theme update and later embed loading continue when persistence is denied. Regression test authored at `test/theme-storage.test.mjs`: verifies persistence handling has an exception guard and that the loader remains sequenced afterward.

- Exact intended command: `node --test test/theme-storage.test.mjs` — **NOT RUN BY BUGHUNTER**.
- No test, build, lint, install, or package manager was run.
- `git diff --check` was run and returned successfully.
- Existing open PR #3's diff is limited to `docs/bughunter/INDEX.md`, its report, package/lockfiles and consent implementation/tests; no overlap with this theme behavior.

## Limits and delivery

No primary browser-framework documentation was needed: the failure is ordinary synchronous JavaScript exception propagation, directly evident in the page's inline script. No production or external testing was performed. The test is source-order coverage and does not execute a browser; a runtime browser test would provide stronger evidence but is outside this scheduled BugHunter boundary.

At report creation, no PR had yet been opened, and therefore no PR checks had been observed. The audit began at `2026-10-16T13:11:39Z` (preflight start) and report was written after `2026-10-16T13:13:07Z`; exact per-phase durations were not instrumented, so no phase or total duration is asserted. Preflight itself reported 21 seconds; that value is not duplicated as work time.
