# Security Policy

This is a private, unpublished-to-the-public-registry package (`@marcfs31/design-system`, distributed via GitHub Packages to Fors Corporation's own repos) — there is no public user base to notify via an advisory.

## Reporting a vulnerability

If you find a security issue in this package (e.g. an XSS vector in a component, a dependency with a known CVE), open a private security advisory on this repository, or contact the maintainer directly rather than filing a public issue.

## Dependencies

Overlay/interactive components depend on [Radix UI](https://www.radix-ui.com/) primitives; styling depends on Tailwind CSS. `npm audit` runs as part of routine maintenance, not currently gated in CI — a finding there doesn't automatically block a release, but should be triaged before the next one.

**Known accepted findings** (as of the 1.0.0 release): `npm audit` reports vite/vitest/esbuild/storybook transitive vulnerabilities (path traversal and arbitrary file read via an exposed dev server or the Vitest UI server, plus a `uuid` buffer-bounds issue via an old Storybook addon dependency). All are **devDependencies only** — none reach the published `dist/` artifact — and the specific attack surface (an exposed Vite dev server, or `vitest --ui`) is never used by this project: CI runs `vitest run` non-interactively, and `npm run storybook`/`npm run dev` are for local development only, never deployed. The only non-breaking fix path is `npm audit fix --force`, which downgrades Storybook and jumps Vite to a major version with its own migration; that trade isn't worth it for a risk that doesn't apply here. Re-evaluate when Storybook/Vitest's own dependency updates close these naturally, or if the dev server is ever exposed beyond localhost.
