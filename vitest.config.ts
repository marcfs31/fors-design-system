import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/__tests__/**",
        "src/test-types.d.ts",
        "src/test-utils/**",
        "src/index.ts",
        "src/theme-entry.ts",
        // Floating (Popper) overlays can't be rendered open under jsdom at a
        // usable speed, so their render bodies have no jsdom test to cover
        // them. They ARE fully exercised (render + open/close + axe) by the
        // Storybook Vitest addon (real Chromium) — a coverage tool v8 can't
        // see. Excluded here so the 95% bar stays meaningful for the ~24
        // components jsdom covers properly.
        "src/components/Popover.tsx",
        "src/components/DropdownMenu.tsx",
        "src/components/Tooltip.tsx",
      ],
      // Set a bit below the actual measured numbers (~99.5/86.5/89/99.5 as of
      // the Separator/Label/Collapsible addition) so this is a real
      // regression gate — catching a wholesale untested addition or a broken
      // branch — not a wall nobody's verified passes. Ratcheted up from the
      // v1.0.0 baseline (95/95/85/80) as coverage genuinely improved; bump up
      // again the same way, never down.
      thresholds: {
        statements: 98,
        lines: 98,
        branches: 85,
        functions: 85,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          globals: false,
          // .claude/worktrees holds throwaway git worktrees (full repo copies with
          // their own node_modules + tests) created by Claude Code sessions.
          exclude: [...configDefaults.exclude, ".claude/worktrees/**", "fixtures/**"],
          // Radix overlay tests still open a portal + run focus-scope/floating-ui
          // logic under jsdom (no layout engine), which is slow-ish on a loaded CI
          // runner. The pathological case — `axe` on an *open* overlay, which ran
          // for minutes — has been moved to the Storybook Vitest addon (real
          // Chromium); what's left here is structural and comfortably under 60s.
          testTimeout: 60000,
        },
      },
      {
        extends: true,
        plugins: [
          // Transforms every `*.stories.tsx` file into a Vitest test suite (one
          // test per story) using Storybook's portable-stories API. Replaces
          // @storybook/test-runner: this runs the composed story (decorators +
          // parameters from .storybook/preview.ts applied) in a real, headless
          // Chromium via @vitest/browser + Playwright, so a component that
          // throws on mount — or a play function assertion that fails — fails
          // this suite. @storybook/addon-a11y (registered in .storybook/main.ts)
          // hooks into the same per-story lifecycle to run a full axe-core pass
          // afterward — see .storybook/preview.ts's `parameters.a11y` and
          // project-level `beforeEach` for how that's configured.
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            // Only used when this project runs in watch mode (`npm run
            // test:storybook`) and no Storybook is already reachable at
            // storybookUrl — lets a local dev loop auto-start one. Never
            // triggers for the one-shot `vitest run` CI uses.
            storybookScript: "npm run storybook -- --ci",
          }),
        ],
        test: {
          name: "storybook",
          // No custom `setupFiles` here on purpose — a project-level
          // `setupFiles` entry pointing at a plain module (rather than one
          // the addon itself generates) has been flaky to resolve in CI for
          // this addon (storybookjs/storybook#33347); everything this
          // project needs (reduced-motion, per-story DOM isolation for the
          // a11y scan) lives in .storybook/preview.ts's `beforeEach`
          // instead, which the addon already loads as project annotations.
          //
          // A story with a full axe pass (e.g. the full-page Fors/Overview
          // story) plus the "Axe is already running" retry backoff can run
          // past Vitest's 5s default on a loaded CI runner.
          testTimeout: 30000,
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
            // Exposes a real Playwright `page` to browser-context code (see
            // .storybook/preview.ts's `beforeEach`), for actions the standard
            // @vitest/browser/context `page` object doesn't expose — mirrors
            // the old test-runner.ts's `page.emulateMedia(...)`.
            commands: {
              async forceReducedMotion({ page }) {
                await page.emulateMedia({ reducedMotion: "reduce" });
              },
            },
          },
        },
      },
    ],
  },
});
