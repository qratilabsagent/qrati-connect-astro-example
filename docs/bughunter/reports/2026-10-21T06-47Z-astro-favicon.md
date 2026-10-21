# BugHunter audit: Astro favicon delivery

- Run: `20261021T064739Z-1f63be4b9db940539852c8f91361f195`
- Repository: `qrati-labs/qrati-connect-astro-example`
- Base: fetched `origin/main` at `24e0cc5` (preflight SHA `24e0cc5`)
- Scope: favicon and Apple touch icon URL construction from Astro `BASE_URL` through configured base path and public files.
- Disposition: report-only; no confirmed defect.
- Issue: none; no defect established.

## Evidence and limitations

`src/pages/index.astro:6` derives `BASE_URL` from `import.meta.env.BASE_URL` with a trailing slash. The favicon links at lines 52–54 append `qrati-logo-square.svg` and `qrati-connect-logo-square.png`; both files exist in `public/`. `astro.config.mjs:8-9` configures the base `/connect/astro-example` and output directory `./dist/connect/astro-example`. The checked-in paths and configured base are consistent. The source trace does not prove the generated browser URLs or deployed asset responses; no build or live request was performed, as prohibited by BugHunter. No reachable failure was established.

This workflow is distinct from open PRs #3 (consent/GTM), #5 (theme storage), #6 (FAQ), #7 (outbound links), #8 (static asset routing), #9 (README embed identity claims), and #10 (crawler discovery); inspected diffs show none changes favicon markup/assets. No other workflow was audited.

## Verification

- Fresh isolated worktree from the fetched preflight base; initial status clean.
- No tests authored; tests/build/lint/type-check/coverage/install not run by BugHunter.
- No production access or mutation.
- Timing: preflight 2026-10-21T06:47:39Z–06:48:07Z; audit 06:48:18Z–06:49:36Z; total 00:01:57 (06:47:39Z–06:49:36Z); unclassified interval 00:00:11. IST: 12:17:39–12:19:36, total 00:01:57. Copied from the timer ledger; timing insertion occurs after snapshot.

## Scope limitation

This is a bounded source-level review only. It does not verify generated output or deployed icon availability.
