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

## Timing

Measured timing and the phase breakdown will be inserted from the BugHunter timing ledger after finalization; no durations are estimated.

## Delivery

A report-only documentation PR will contain this report and the index entry. PR URL, base/head, changed paths, mergeability, closing-issue references, and checks will be recorded after remote readback.
