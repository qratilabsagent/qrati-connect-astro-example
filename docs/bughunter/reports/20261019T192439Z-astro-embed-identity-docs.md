# Astro embed identity documentation mismatch

- **Scope:** Astro example embed identity initialization; base `main` SHA `24e0cc5050b5a737ba4472dd9691353ed8e948c1`.
- **Finding:** [low] README falsely claims the demo injects `data-uid`, `data-fname`, and `data-lname` for a known user and re-injects the script when identity/theme changes.
- **Evidence:** `README.md` previously claimed those behaviors. In `src/pages/index.astro`, the rendered `<qrati-connect>` receives only `organization-id`, `theme`, and `router`; the inline loader appends the configured script once, and its state changes only update theme. `.env.example` has organization/script/GTM settings, no identity values.
- **Trigger/impact:** A developer follows the documented integration expecting an identified user, but the example does not configure one. This is a documentation defect; no user-identity behavior was added because authorization and intended identity semantics are not established by this repository.
- **Disposition:** Corrected the README to describe the actual element-based setup and explicitly say identity is not configured. No production or runtime changes.
- **Issue:** None; docs-only correction, no source fix.
- **Tests:** None authored; documentation-only change. No builds, tests, lint, installs, or package managers run (BugHunter boundary).
- **PR/checks:** PR #9, https://github.com/qrati-labs/qrati-connect-astro-example/pull/9. Mergeable; GitGuardian Security Checks pending at initial check.
- **Limitations:** The remote embed script's identity contract was not independently validated; this audit only establishes the example's local behavior and README mismatch. Related open PRs were checked; none changed this workflow's implementation. No existing issue matched the searched identity terms.
- **Timing (measured wall-clock):** preflight 2026-10-19 19:24:39–19:25:10 UTC / 2026-10-20 00:54:39–00:55:10 IST (00:00:31); audit 2026-10-19 19:25:20–19:28:13 UTC / 2026-10-20 00:55:20–00:58:13 IST (00:02:54); total 2026-10-19 19:24:39–19:28:13 UTC / 2026-10-20 00:54:39–00:58:13 IST (00:03:34). Unclassified interval between phase markers: 00:00:10. The timer snapshot precedes this timing-table insertion.
