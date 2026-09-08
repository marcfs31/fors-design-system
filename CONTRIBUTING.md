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
npm run format:check     # npm run format to auto-fix
npm run test:coverage    # coverage thresholds are enforced — see vitest.config.ts
npm run build
npm run build-storybook
npm run size              # bundle-size budget — see the "size-limit" field in package.json
```

All of these run in CI; failing any of them blocks merge.

**Dependency bumps**: verify against the Node version in `.nvmrc` (20), not
whatever's globally installed — CI's matrix (20 & 22) exists because dev
tooling occasionally uses a newer Node API than 20 ships (e.g. `size-limit@13`
used `fs.promises.glob`, added in Node 22.13, and broke the Node 20 CI job
even though it worked locally on a newer Node). `nvm use` before testing a
bump.

## Adding or changing a component

> Working with Claude Code in this repo? Two project skills encode everything
> below in full: **`new-component`** (authoring one to spec) and
> **`component-audit`** (sweeping the library for a11y / responsive defects).
> They live in `.claude/skills/` and load automatically when the task matches.

Every component needs, at minimum:

- `Name.tsx` — `React.forwardRef`, variants via `class-variance-authority` where applicable, and JSDoc on the exported component describing _when_ to use each variant (this becomes both the Storybook description and, eventually, the design-agent-facing docs when this repo is synced to claude.ai/design).
- `Name.stories.tsx` — 2–5 named-export stories with realistic content (not `foo`/`bar`).
- `Name.test.tsx` — behavior tests (render, interaction) plus an accessibility check:
  ```tsx
  import { axe } from "../test-utils/axe"; // not "vitest-axe" directly — see that file for why
  expect(await axe(container)).toHaveNoViolations();
  ```
- If it introduces new color/state combinations, add the relevant fg/bg pairs to `src/tokens/__tests__/contrast.test.ts`.
- Export it from `src/index.ts`.

### Accessibility (WCAG 2.1 AA) — non-negotiable, checked before merge

- **Name / role / value** on every interactive element; decorative `<svg>` gets `aria-hidden="true"`; no redundant/invalid roles.
- **Helper / error text is linked** to its control via `aria-describedby` (id from `React.useId()`), with `aria-invalid` on error — see `Input.tsx` / `Textarea.tsx`.
- **Keyboard**: fully operable; custom widgets implement their WAI-ARIA key model (Arrow/Home/End/Esc/Enter/Space) and `id`↔`aria-controls`/`aria-labelledby` wiring — see the hand-rolled `Tabs.tsx`.
- **Visible focus** via `focus-visible:outline-none focus-visible:shadow-focus-ring` everywhere.
- **Touch targets ≥ 24×24 px** (WCAG 2.5.8) — pad icon-only buttons; bare checkbox/radio is `h-6 w-6`.
- **Live regions** for async feedback: `role="status"` (polite) / `role="alert"` (assertive for errors) — see `Alert.tsx`.
- Reduced motion is already handled globally in `src/styles/globals.css` — don't re-implement it per component.
- The `axe` test above is the automated floor; it does not replace this checklist.

### Responsiveness — usable at 320 / 768 / 1280 px, no horizontal page scroll

- Cap fixed widths that can exceed 320px: `max-w-[calc(100vw-2rem)]`, or `max-w-[var(--radix-popper-available-width)]` for Radix poppers. `Dialog` content is `w-[calc(100vw-2rem)] max-w-md`.
- Tall overlays scroll internally (`max-h-[calc(100vh-2rem)] overflow-y-auto`), not off the viewport.
- Wide content (tables) lives in `<div className="w-full overflow-x-auto">`.
- Control strips wrap (`flex-wrap`) or scroll (`overflow-x-auto` + `shrink-0` children).
- No `whitespace-nowrap` on user content; add `min-w-0` to growable flex children.
- Verify in Storybook at 375px and desktop, in **both** themes — the `Fors/Overview` "Kitchen" story is the fastest whole-system check.

### RTL (`dir="rtl"`)

- Use logical properties, not physical ones: `text-start`/`text-end` (not `text-left`/`text-right`), `ms-*`/`me-*`/`ps-*`/`pe-*` (not `ml-*`/`mr-*`/`pl-*`/`pr-*`), `start-*`/`end-*` (not `left-*`/`right-*`), `border-s`/`border-e` (not `border-l`/`border-r`). `justify-start`/`justify-end` and flex/grid item order are already logical — no change needed there.
- `translateX`/`translateY` have no logical equivalent — anything that moves an element sideways (a toggle thumb, a slide-in animation) needs explicit `ltr:`/`rtl:`-scoped values, verified by real rendered position (`getBoundingClientRect`), not `toHaveClass` — both direction's classes are always present in the DOM regardless of which one's CSS actually wins. See `Switch.tsx`'s thumb and its `Fors/Switch` "RTL" story for the pattern.
- Centering (`left-1/2 -translate-x-1/2`) and Radix's own Popper positioning (`POPPER_ANIMATION_CLASSES`'s `data-[side=...]`, which reads viewport-relative collision detection, not text direction) need no changes.
- Verify in Storybook with the toolbar's Direction toggle (or a `<div dir="rtl">` wrapper, for a fixed comparison in one story) at 375px and desktop, in both themes — `Fors/Overview` → "KitchenSinkRTL" is the whole-system check, mirroring "Kitchen".

Overlay or positioned components (anything opening on click/hover — dialogs, menus, tooltips, popovers) should be built on a Radix UI primitive rather than hand-rolled — see any existing overlay component (`Dialog.tsx`, `Popover.tsx`) for the pattern: unstyled Radix primitive + this repo's Tailwind token classes + `POPPER_ANIMATION_CLASSES` from `src/lib/animation.ts` for open/close motion.

**Testing overlay components (Dialog, DropdownMenu, Popover, Tooltip, Select):** keep jsdom tests **structural and fast** — render with `defaultOpen` and assert roles / props / classes. Do **not** run `axe()` on an _open_ overlay in jsdom: with no layout engine it takes minutes and times out on CI. Open-state accessibility and real open/close interaction are covered by the Storybook test runner in real Chromium (`npm run test:storybook`) via the component's stories and `play` functions. `axe()` in a `*.test.tsx` is for **inline** components. See `.claude/skills/testing`.

## Versioning

> Full workflow — bump-type decision table, the release-commit shape, and the
> tag-sync check — is in the **`release`** project skill (`.claude/skills/`).

This repo uses [Changesets](https://github.com/changesets/changesets). Any change that affects the published package (a new component, a prop change, a visual change, a bug fix) needs a changeset:

```bash
npx changeset
```

Answer the prompts: bump type (`patch` for fixes/tweaks, `minor` for new components/props, `major` for breaking changes to an existing component's API or behavior) and a summary — this text becomes the CHANGELOG entry. Commit the generated `.changeset/*.md` file alongside your code change. Internal tooling/docs changes that don't affect consumers (CI config, `.claude/`, this file, dev dependencies) don't need one.

Cutting a release (maintainer): `npx changeset version` to bump `package.json` + rewrite `CHANGELOG.md`, then commit that alone as `chore(release): x.y.z` and tag it `git tag -a vX.Y.Z`. **Every version in `CHANGELOG.md` has a matching annotated `vX.Y.Z` tag on its release commit** — `git tag --list 'v*'` against the `## X.Y.Z` headings should never disagree. `npm run release` publishes.
