# Fors Design System

The design system behind Fors Corporation's software: brand tokens and a React component library shared across every custom client app and in-house product Fors builds, so nothing starts from a blank Tailwind config again.

**Brand concept.** "Fors" is Swedish/Norwegian for rapids — force, flow, clarity, momentum. The palette is dark-first and engineering-forward: near-black ink surfaces, a signature Rapids Teal accent, a Spark Amber secondary, Inter for body/UI text, Space Grotesk for headings. A light theme is included for apps that need it — see [Theming](#theming) below.

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

The stylesheet ships Tailwind's compiled component/utility layers only (no Preflight reset) — safe to import alongside an app that runs its own Tailwind base.

## Theming

Dark is the default — nothing to configure. For an app that also needs light mode, import the theme utilities and own the switcher/persistence yourself:

```tsx
import { applyForsTheme, forsAntiFlashScript } from "@marcfs31/design-system";

// In your root layout's <head>, before hydration:
<script dangerouslySetInnerHTML={{ __html: forsAntiFlashScript() }} />;

// Wherever the user toggles theme:
applyForsTheme("light");
```

## Development

```bash
npm install
npm run storybook       # component playground at localhost:6006
npm test                # unit + accessibility + token-contrast tests
npm run typecheck
npm run build            # dist/index.js + dist/index.d.ts + dist/styles.css
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
