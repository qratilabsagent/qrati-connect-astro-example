# BugHunter audit: Astro crawler discovery

- Run: `20261020T145039Z-ec4bcab6bce245459200ba7f2f9a5d40`
- Repository/base: `qrati-labs/qrati-connect-astro-example`, fetched `origin/main` at `24e0cc5050b5a737ba4472dd9691353ed8e948c1`.
- Scope: discoverability of the public Astro example through `robots.txt`, the declared sitemap, static sitemap URL, canonical URL, and Astro base/output configuration.
- Disposition: report-only; no confirmed defect. No issue or source/test changes.
- CodeGraph: repository was not indexed; focused source reads used instead.

## Trace and evidence

`astro.config.mjs:8-9` sets `base` to `/connect/astro-example` and output directory to `./dist/connect/astro-example`. `public/robots.txt` allows all crawlers and declares `https://qrati.com/connect/astro-example/sitemap.xml`. `public/sitemap.xml` contains one absolute `<loc>` at `https://qrati.com/connect/astro-example`, matching the page canonical URL in `src/pages/index.astro:39`. The page also declares index/follow metadata (`:37-38`). Static review found no conflicting host/path or inaccessible URL in these local declarations. Google Search Central's guidance describes robots.txt as a crawler directive and documents sitemap URL requirements; sources: https://developers.google.com/search/docs/crawling-indexing/robots/intro and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap.

Current open PRs were queried in full and their diffs reviewed. PR #9 changes README identity claims and report/tracker docs; #8 adds report/tracker docs; #7 adds report/tracker docs; #6 adds FAQ audit docs; #5 changes best-effort theme persistence in the page (not crawler declarations or delivery); #3 changes cookie-consent/GTM startup. None changes the crawler-discovery workflow selected here. No second workflow was audited.

## Finding and limitations

No confirmed defect in the traced crawler-discovery configuration. The audit cannot establish that production serves these exact files at these paths, that provider routing is operational, or that any search engine has fetched/indexed them. No live site or production behavior was tested. These are explicit limitations, not findings.

- Tests authored: none; no regression case was indicated by the source evidence.
- Tests/builds/lint/type-check/coverage/install/package-manager commands: **NOT RUN BY BUGHUNTER**.
- `git diff --check` is the only permitted patch verification.
- No issue was needed because no defect was confirmed; no production mutation or deployment occurred.

## Timing (measured wall-clock)

| Phase | Segment start (UTC) | Segment end (UTC) | Elapsed |
|---|---|---|---|
| `preflight` | 2026-10-20T14:50:39Z | 2026-10-20T14:51:08Z | 00:00:30 (0.5 min) |
| `audit` | 2026-10-20T14:51:19Z | 2026-10-20T14:56:29Z | 00:05:10 (5.2 min) |
| **Total run (preflight start to finish)** | 2026-10-20T14:50:39Z | 2026-10-20T14:56:30Z | **00:05:51 (5.8 min)** |
| Unclassified interval between marked phases | — | — | 00:00:11 (0.2 min) |

The table is copied from the timer ledger. Timing-table insertion occurs after the measurement snapshot.
