# Security Policy

The **source** of this project is public. The **package** (`@marcfs31/design-system`) is not — it's published to GitHub Packages with `restricted` access and installed only by Fors Corporation's own repos, so there is no broad public consumer base.

## Reporting a vulnerability

If you find a security issue in this project (e.g. an XSS vector in a component, a dependency with a known CVE), open a private security advisory on this repository ("Security" → "Report a vulnerability") or contact the maintainer directly rather than filing a public issue.

## Dependencies

Overlay/interactive components depend on [Radix UI](https://www.radix-ui.com/) primitives; styling depends on Tailwind CSS. `npm audit` runs as part of routine maintenance, not currently gated in CI — a finding there doesn't automatically block a release, but should be triaged before the next one.

**Known accepted findings** (rechecked as of `v1.2.0` + the September 2026 dependency triage — `npm audit`: 14 findings, 2 critical / 1 high / 11 moderate): every one traces to exactly two root advisories, both **devDependencies only** — never reaching the published `dist/` artifact:

1. **`vite`/`vitest`/`esbuild`/`@vitest/coverage-v8`/`@vitest/mocker`** (critical/high/moderate) — path traversal and arbitrary file read via an exposed Vite dev server or the Vitest UI server. This project never exposes either: CI runs `vitest run` non-interactively, `npm run storybook`/`npm run dev` are local-only and never deployed, and `vitest --ui` isn't used anywhere.
2. **`uuid` <11.1.1** (moderate, buffer-bounds check) — pulled in transitively through `@storybook/addon-essentials`'s `addon-actions` **and**, since the testing-infrastructure additions, through `@storybook/test-runner`'s own chain (`jest-playwright-preset` → `nyc`/`jest-junit` → `istanbul-lib-processinfo`). Same root cause in both paths; the code that touches `uuid` (test scaffolding / coverage instrumentation glue) never runs against untrusted input.

The only non-breaking-free fix for either is `npm audit fix --force`, which forces Storybook and Vite into major versions with their own migrations (see the currently-open, deliberately-deferred Storybook 8→10 Dependabot PR) — not worth taking blind. Re-evaluate when Storybook/Vitest's own dependency graphs close these naturally, when the deferred Storybook major migration happens, or if the dev server is ever exposed beyond localhost.
