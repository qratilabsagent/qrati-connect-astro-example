# Astro example outbound navigation audit

- **Run:** `20261019T072639Z-e128df1ed57b4dd79fdec2d869cf4e99`
- **Repository/base:** `qrati-labs/qrati-connect-astro-example`, `origin/main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`.
- **Scope:** Outbound links visible in the landing page hero, CTA, and footer, from their source values through rendered `href` destinations and new-tab security attributes. Excludes FAQ, theme/storage, cookie consent, widget startup, and SEO metadata.
- **Disposition:** Report-only; no confirmed defect. No issue, source edits, or regression tests.

## Trace and evidence

The page defines `GITHUB_ORG`, `REPO`, `repoUrl`, `vscodeUrl`, and `npmUrl` in the Astro frontmatter (`src/pages/index.astro:8-12`). The hero links resolve to the GitHub repository, VS Code's GitHub view of that same repository, and the public npm package (`:253-271`). The Qrati brand and primary conversion CTA link to `https://qrati.com` (`:243-244`, `:476-483`). Footer navigation links to Qrati, npm, the Qrati Labs GitHub organization, and pricing (`:503-508`). Each external link opens a new tab and declares `rel="noopener noreferrer"`.

No dynamic user-controlled URL or redirect is involved. The linked destinations are fixed constants or interpolations from fixed repository/organization constants. The repository history confirms these values derive from the page's prior SEO/navigation implementation. The destination URLs and link contract are consistent with README references to Qrati Connect and the live Astro example. Static source review did not establish a broken or misdirected destination, nor an unsafe opener relationship.

Relevant open PRs were compared by changed paths and behavior: PR #6 changes only audit documentation; PR #5 changes best-effort theme preference persistence in the page and does not change link destinations or activation; PR #3 changes cookie-consent/GTM behavior. None overlaps outbound navigation. The open theme-storage issue #4 and related PR do not concern these links.

## Finding and limits

No confirmed defect. No severity assigned. This is a source-level audit: no links were clicked and no external destination availability or analytics attribution was tested. Those facts remain unverified; no runtime or production claim is made.

- Issue: none required (no confirmed finding).
- Tests authored: none; no regression test was indicated by the evidence.
- Tests, builds, lint, type-check, installs, and package-manager commands: **NOT RUN BY BUGHUNTER**.
- No external tests or production mutations performed.

## Timing (measured wall-clock)

| Phase | Segment start (UTC) | Segment end (UTC) | Elapsed |
|---|---|---|---|
| Preflight | 2026-10-19T07:26:39Z | 2026-10-19T07:27:04Z | 00:00:25 |
| Audit | 2026-10-19T07:27:16Z | 2026-10-19T07:29:19Z | 00:02:03 |
| Unclassified interval between marked phases | — | — | 00:00:31 |
| **Total run** | 2026-10-19T07:26:39Z | 2026-10-19T07:29:38Z | **00:02:59** |

IST (UTC+05:30): preflight 12:56:39–12:57:04; audit 12:57:16–12:59:19; total 12:56:39–12:59:38. The 31-second interval is reported as unclassified, not assigned to either phase.

## Delivery

PR #7: https://github.com/qrati-labs/qrati-connect-astro-example/pull/7. Final readback: OPEN and MERGEABLE against `main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`; feature branch `bughunter/20261019T072639Z-e128df1ed57b4dd79fdec2d869cf4e99-audit` is published from the authorized `qratilabsagent` fork. The changed files are this report and `docs/bughunter/INDEX.md`; no closing issue references. At final check snapshot, GitGuardian Security Checks was pending. No merge or deployment.
