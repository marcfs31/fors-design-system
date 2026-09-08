import type { Preview } from "@storybook/react";
import React from "react";
import { addons } from "storybook/internal/preview-api";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import "../src/styles/globals.css";
import { ForsDocsContainer } from "./DocsContainer";

/**
 * Applies the `theme` / `dir` globals to the preview document. Called from
 * the decorator (initial paint, per-story globals) and, below, straight from
 * the globals channel event — so a toolbar toggle flips the whole iframe in
 * one CSS-cascade pass instead of block-by-block as each story re-renders.
 */
function applyGlobals(globals: Record<string, unknown>) {
  document.documentElement.setAttribute("data-theme", (globals.theme as string) ?? "dark");
  document.documentElement.dir = (globals.dir as string) ?? "ltr";
}
addons
  .getChannel()
  .on(GLOBALS_UPDATED, ({ globals }: { globals: Record<string, unknown> }) =>
    applyGlobals(globals)
  );

/**
 * A real theme toolbar, not a fixed "backgrounds" swatch: the Storybook
 * backgrounds addon paints a hardcoded color behind every story regardless
 * of `data-theme`, which silently breaks light-theme stories (dark text on
 * a backdrop still forced dark). Instead this sets `data-theme` on the
 * preview iframe's own <html> so the real token cascade (including body's
 * `background-color: var(--fors-ink-bg)` from globals.css) does the work,
 * matching how a real consuming app renders.
 */
const preview: Preview = {
  // Storybook 9+ replaced the global `docs.autodocs` boolean with per-story
  // opt-in via tags; applying it here at the project level opts every story
  // in, matching the old blanket `autodocs: true` behavior.
  tags: ["autodocs"],
  globalTypes: {
    // No `toolbar` here on purpose: the theme control is a single toggle
    // button, rendered by the manager addon in manager.tsx (which also themes
    // Storybook's own UI). Declaring the global keeps it in the URL / globals
    // API so the decorator below and the Docs container can read it.
    theme: {
      description: "Fors theme",
    },
    // Same as `theme`: a toggle button in manager.tsx, no stock dropdown.
    dir: {
      description: "Text direction",
    },
  },
  initialGlobals: {
    theme: "dark",
    dir: "ltr",
  },
  parameters: {
    // Sidebar order: the Overview first, then the component categories in a
    // deliberate top-down reading order (type → inputs → overlays → feedback
    // → data → navigation); components alphabetical within a category.
    // Story titles are "Fors/<Category>/<Component>" — see src/**/*.stories.tsx.
    options: {
      storySort: {
        order: [
          "Fors",
          ["Overview", "Typography", "Forms", "Overlays", "Feedback", "Data Display", "Navigation"],
        ],
      },
    },

    backgrounds: { disable: true },

    // Docs pages (autodocs) are rendered by Storybook's own UI, which doesn't
    // see our CSS tokens — the container below themes that chrome to match
    // the toolbar's theme. The manager UI is themed in .storybook/manager.ts.
    docs: { container: ForsDocsContainer },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      //
      // @storybook/addon-a11y already disables the `region` rule by default
      // (isolated component stories have no page landmarks by design); a
      // story can re-enable it via `parameters.a11y.config.rules: [{ id:
      // "region", enabled: true }]` (see src/Overview.stories.tsx, the one
      // full-page story) or opt out entirely via `parameters.a11y.disable`.
      test: "error",
    },

    // Real-browser viewport the Storybook Vitest addon (vitest.config.ts)
    // resizes the page to before each story's checks run — needed for
    // anything gated by a CSS breakpoint (a mobile drawer that's
    // `md:hidden`, say). A story overrides this by giving its own
    // `parameters.viewport.options` + `defaultViewport` (see
    // src/components/Sidebar.stories.tsx's `MobileDrawer`); every other
    // story explicitly gets this default, since the addon runs
    // `setViewport` unconditionally before every story.
    viewport: {
      options: {
        default: { name: "Default", styles: { width: "1280px", height: "720px" } },
      },
      defaultViewport: "default",
    },
  },
  decorators: [
    (Story, context) => {
      applyGlobals(context.globals);
      return React.createElement(Story);
    },
  ],
  // Runs only under the Storybook Vitest addon (vitest.config.ts), never
  // during normal `storybook dev`/`build-storybook` browsing — guarded by
  // the same `__vitest_browser__` flag @storybook/addon-vitest's own code
  // uses internally to detect that environment.
  async beforeEach(context) {
    if (!globalThis.__vitest_browser__) return;

    // Matches @storybook/test-runner's old `preVisit`: force
    // `prefers-reduced-motion` before the story mounts, so overlay enter
    // animations (which globals.css collapses under that media query)
    // resolve instantly and the a11y check below measures the settled
    // visual state, not a mid-transition frame. Dynamically imported with a
    // fallback, matching @storybook/addon-vitest's own test-utils.ts — this
    // file is also bundled for normal Storybook browsing, where
    // `@vitest/browser/context` isn't a live connection.
    const { commands } = await import("@vitest/browser/context").catch(() => ({
      commands: null,
    }));
    await commands?.forceReducedMotion?.();

    // @storybook/addon-vitest composes+mounts each story straight into the
    // current page and never tears the previous one down between tests in
    // the same file (unlike @storybook/test-runner, which navigated to a
    // fresh page per story) — so an intentionally-left-open story (e.g.
    // DropdownMenu's `ProjectActions`, shown open "for visual review") would
    // otherwise leak its rendered DOM into every later story's a11y scan in
    // that file, which reads `document.body` broadly by default. Excluding
    // whatever's already in the page before this story mounts restores that
    // per-story isolation — without ever touching/removing the stale DOM
    // (axe-core's `exclude` accepts live element references, not just
    // selectors, so this needs no id/class to target them by).
    // Filters out `context.canvasElement` itself: it's already appended to
    // the page (still empty) by this point in the lifecycle, so a plain
    // "everything in body right now" snapshot would wrongly count *this*
    // story's own container as stale and exclude its own content once
    // rendered.
    const staleElements = Array.from(document.body.children).filter(
      (el) => el !== context.canvasElement
    );
    const a11y = context.parameters.a11y as Record<string, unknown> | undefined;
    context.parameters.a11y = {
      ...a11y,
      context: {
        ...(a11y?.context as Record<string, unknown> | undefined),
        exclude: staleElements,
      },
    };
  },
};

export default preview;
