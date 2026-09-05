---
"@marcfs31/design-system": minor
---

Next.js App Router / React Server Components compatibility, and confirmed React 19 support.

- The components entry (`@marcfs31/design-system`) now ships a leading `"use client"` directive — every component is interactive (hooks / Radix), so the whole bundle is a client module usable directly inside an RSC tree, no wrapper `"use client"` file required.
- New server-safe entry **`@marcfs31/design-system/theme`**: `applyForsTheme`, `forsAntiFlashScript`, `FORS_THEMES`, `FORS_PALETTES`/`DARK_PALETTE`/`LIGHT_PALETTE`, and `cn` — no client directive, callable from a Server Component (e.g. a Next.js root layout). `publint`/`arethetypeswrong` validate it clean on every resolution mode, including legacy `node10` (via a root `theme/package.json` stub).
- Type families are now CSS variables — `--fors-font-sans`, `--fors-font-heading`, `--fors-font-mono` — so a consumer can point them at `next/font` (or any self-hosted face) instead of the bundled Google Fonts import.
- The shipped `styles.css` no longer makes a network call: the Google Fonts `@import` moved to a new optional **`@marcfs31/design-system/fonts.css`** entry. Without either, text falls back to `system-ui` — never invisible, just not on-brand until fonts are wired up.
- React 19: confirmed compatible — peer range (`>=18`) and the resolved Radix versions (`^19.0` in their own peer ranges) both support it; no removed API (`forwardRef`, etc.) is used.

README gained "Using with Next.js" and "Fonts" sections.
