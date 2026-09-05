# Fors Design System

[![CI](https://github.com/marcfs31/fors-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/marcfs31/fors-design-system/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-live-16C7B0)](https://marcfs31.github.io/fors-design-system/)

The design system behind Fors Corporation's software: brand tokens and a React component library shared across every custom client app and in-house product Fors builds, so nothing starts from a blank Tailwind config again.

**[Browse the component library →](https://marcfs31.github.io/fors-design-system/)** (Storybook, deployed from `main`)

**Brand concept.** "Fors" is Swedish/Norwegian for rapids — force, flow, clarity, momentum. The palette is dark-first and engineering-forward: near-black ink surfaces, a signature Rapids Teal accent, a Spark Amber secondary, Inter for body/UI text, Space Grotesk for headings. A light theme is included for apps that need it — see [Theming](#theming) below.

**Compatibility.** React 18 and 19 · Next.js App Router, [RSC-ready](#using-with-nextjs) (the components entry ships `"use client"`) · ESM + CJS, validated with `publint`/`arethetypeswrong` on every resolution mode.

## Install

Published to GitHub Packages under the `@marcfs31` scope. Add to the consuming repo's `.npmrc`:

```
@marcfs31:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` is a classic GitHub personal access token with `read:packages` scope — set it as an environment variable locally and in your deployment platform (e.g. a Vercel project environment variable). Then:

```bash
npm install @marcfs31/design-system
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@marcfs31/design-system";
import "@marcfs31/design-system/styles.css";
import "@marcfs31/design-system/fonts.css"; // optional — see Fonts below

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy your project</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Deploy</Button>
      </CardContent>
    </Card>
  );
}
```

Two entries:

- **`@marcfs31/design-system`** — the components. Every one is interactive (hooks / Radix), so the bundle ships a `"use client"` directive — usable directly inside a React Server Component tree with no wrapper.
- **`@marcfs31/design-system/theme`** — server-safe utilities (`applyForsTheme`, `forsAntiFlashScript`, the raw palettes, `cn`). No `"use client"` — call these from a Server Component (e.g. a Next.js root layout).

`styles.css` ships Tailwind's compiled component/utility layers only (no Preflight reset, no network calls) — safe alongside an app that runs its own Tailwind base and its own CSP.

### Fonts

`styles.css` references the brand families (`Inter`, `Space Grotesk`) by name but doesn't load them — nothing in the shipped CSS makes a network call. Provide the faces yourself:

- **Quickest**: `import "@marcfs31/design-system/fonts.css"` — loads both from Google Fonts.
- **Next.js / production**: use `next/font` and point the tokens at it (see [Using with Next.js](#using-with-nextjs)).
- **Self-hosted**: set `--fors-font-sans` / `--fors-font-heading` on `:root` to your own stack — every component reads the font through those two CSS variables.

Without any of the above, text falls back to `system-ui` — never invisible, just not on-brand.

## Theming

Dark is the default — nothing to configure. For an app that also needs light mode, import the theme utilities from the **server-safe entry** and own the switcher/persistence yourself:

```tsx
import { applyForsTheme, forsAntiFlashScript } from "@marcfs31/design-system/theme";

// In your root layout's <head>, before hydration:
<script dangerouslySetInnerHTML={{ __html: forsAntiFlashScript() }} />;

// Wherever the user toggles theme:
applyForsTheme("light");
```

## Using with Next.js

App Router, Server Components, `next/font` — all supported.

```tsx
// app/layout.tsx (Server Component — no "use client" needed here)
import "@marcfs31/design-system/styles.css";
import { forsAntiFlashScript } from "@marcfs31/design-system/theme";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={
        {
          "--fors-font-sans": "var(--font-inter)",
          "--fors-font-heading": "var(--font-space-grotesk)",
        } as React.CSSProperties
      }
    >
      <head>
        {/* Applies a stored theme before paint — no flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: forsAntiFlashScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Then use components anywhere — in a Server Component tree directly, or in your own `"use client"` files:

```tsx
import { Button } from "@marcfs31/design-system";

export default function Page() {
  return <Button>Deploy</Button>; // no "use client" needed in this file
}
```

Don't add `import "@marcfs31/design-system/fonts.css"` alongside `next/font` — that would load the same families twice, once render-blocking from Google and once self-hosted.

## Development

```bash
npm install
npm run storybook       # component playground at localhost:6006
npm test                # unit + accessibility + token-contrast tests
npm run typecheck
npm run build            # dist/{index,theme}.{js,cjs,d.ts,d.cts} + dist/{styles,fonts}.css
npm run build-storybook  # static Storybook build
```

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets):

```bash
npm run changeset          # after a change worth releasing — prompts for a bump + summary
npm run version-packages   # bumps package.json + writes CHANGELOG.md
npm run release            # builds and publishes to GitHub Packages
git push --follow-tags
```

## Component set

Typography: `Heading`, `Text`. Forms: `Button` (with a built-in `loading` state), `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Slider`. Overlays: `Dialog`, `DropdownMenu`, `Popover`, `Tooltip`, `Toast`/`Toaster`/`useToast`. Feedback & data: `Alert`, `Badge`, `Avatar`/`AvatarGroup`, `Spinner`, `Progress`, `Skeleton`, `Card`, `Table`, `Tabs`, `Accordion`. Navigation: `Breadcrumb`, `Pagination`.

Overlay/select components are built on [Radix UI](https://www.radix-ui.com/) primitives for correct focus management and keyboard behavior; every component ships fully unstyled from Radix and is styled entirely through this repo's Tailwind token vocabulary. Open/close motion for every overlay comes from `tailwindcss-animate`, driven by Radix's own `data-state`/`data-side` attributes, and automatically collapses under `prefers-reduced-motion`.

Every component has a Storybook story (with autodocs generating a props-table page from its TypeScript types) and a co-located test covering behavior and accessibility (`vitest-axe`).
