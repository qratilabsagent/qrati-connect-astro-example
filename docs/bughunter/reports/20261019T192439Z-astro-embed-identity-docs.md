# Astro embed identity documentation mismatch

- **Scope:** Astro example embed identity initialization; base `main` SHA `24e0cc5050b5a737ba4472dd9691353ed8e948c1`.
- **Finding:** [low] README falsely claims the demo injects `data-uid`, `data-fname`, and `data-lname` for a known user and re-injects the script when identity/theme changes.
- **Evidence:** `README.md` previously claimed those behaviors. In `src/pages/index.astro`, the rendered `<qrati-connect>` receives only `organization-id`, `theme`, and `router`; the inline loader appends the configured script once, and its state changes only update theme. `.env.example` has organization/script/GTM settings, no identity values.
- **Trigger/impact:** A developer follows the documented integration expecting an identified user, but the example does not configure one. This is a documentation defect; no user-identity behavior was added because authorization and intended identity semantics are not established by this repository.
- **Disposition:** Corrected the README to describe the actual element-based setup and explicitly say identity is not configured. No production or runtime changes.
- **Issue:** None; docs-only correction, no source fix.
- **Tests:** None authored; documentation-only change. No builds, tests, lint, installs, or package managers run (BugHunter boundary).
- **PR/checks:** Pending.
- **Limitations:** The remote embed script's identity contract was not independently validated; this audit only establishes the example's local behavior and README mismatch. Related open PRs were checked; none changed this workflow's implementation. No existing issue matched the searched identity terms.
- **Timing:** Pending measured timing ledger.
