# Contributing

This is Fors Corporation's internal design system — the source of truth for every component every Fors app (client or in-house) builds on. Changes here ship to every consumer, so the bar is: tested, accessible, and versioned correctly.

## Setup

```bash
nvm use          # Node version pinned in .nvmrc
npm install
npm run storybook  # component playground at localhost:6006
```

## Before opening a PR

```bash
npm run typecheck
npm run lint
npm run test:coverage   # coverage thresholds are enforced — see vitest.config.ts
npm run build
npm run build-storybook
npm run size             # bundle-size budget — see the "size-limit" field in package.json
```
All of these run in CI; failing any of them blocks merge.

## Adding or changing a component

Every component needs, at minimum:
- `Name.tsx` — `React.forwardRef`, variants via `class-variance-authority` where applicable, and JSDoc on the exported component describing *when* to use each variant (this becomes both the Storybook description and, eventually, the design-agent-facing docs when this repo is synced to claude.ai/design).
- `Name.stories.tsx` — 2–5 named-export stories with realistic content (not `foo`/`bar`).
- `Name.test.tsx` — behavior tests (render, interaction) plus an accessibility check:
  ```tsx
  import { axe } from "../test-utils/axe"; // not "vitest-axe" directly — see that file for why
  expect(await axe(container)).toHaveNoViolations();
  ```
- If it introduces new color/state combinations, add the relevant fg/bg pairs to `src/tokens/__tests__/contrast.test.ts`.
- Export it from `src/index.ts`.

Overlay or positioned components (anything opening on click/hover — dialogs, menus, tooltips, popovers) should be built on a Radix UI primitive rather than hand-rolled — see any existing overlay component (`Dialog.tsx`, `Popover.tsx`) for the pattern: unstyled Radix primitive + this repo's Tailwind token classes + `POPPER_ANIMATION_CLASSES` from `src/lib/animation.ts` for open/close motion.

**A note on testing overlay components under jsdom**: Radix's click-to-open gesture depends on real pointer-capture semantics jsdom doesn't implement, which makes click-driven interaction tests flaky. Test these with keyboard interaction (`.focus()` + `userEvent.keyboard("{Enter}")`) instead — see `DropdownMenu.test.tsx` or `Popover.test.tsx` for the pattern. These tests are also genuinely slower than a plain component (jsdom has no real layout engine, so Radix's positioning math takes real wall-clock time) — that's accounted for in `vitest.config.ts`'s `testTimeout`, not a bug to chase.

## Versioning

This repo uses [Changesets](https://github.com/changesets/changesets). Any change that affects the published package (a new component, a prop change, a visual change, a bug fix) needs a changeset:

```bash
npx changeset
```

Answer the prompts: bump type (`patch` for fixes/tweaks, `minor` for new components/props, `major` for breaking changes to an existing component's API or behavior) and a summary — this text becomes the CHANGELOG entry. Commit the generated `.changeset/*.md` file alongside your code change. Internal tooling/docs changes that don't affect consumers (CI config, this file, dev dependencies) don't need one.

Releasing (`npm run version-packages` to bump + update CHANGELOG.md, `npm run release` to build and publish) is a maintainer action, not something every PR does.
