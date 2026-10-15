# BugHunter audit index

| UTC timestamp | Workflow | Repositories / SHAs | Outcome / severity | Tests and coverage | Research sources | PR |
|---|---|---|---|---|---|---|
| 2026-10-15T20:33Z | Astro geo-aware cookie consent + GTM startup | `qrati-connect-astro-example` @ `24e0cc5050b5a737ba4472dd9691353ed8e948c1`; contract inspected read-only in `qrati-web` | Fixed globally granted GTM default before geo decision (medium) | 1 unit regression test passed; Astro build passed with existing CSS warning; coverage not measured | Google Tag Platform consent guide [1] | [#3](https://github.com/qrati-labs/qrati-connect-astro-example/pull/3) open, mergeable; at head `071b840db243b4f0b77c372192fc6ab1c91d4213` GitGuardian Security Checks were pending (20:36 UTC) |
