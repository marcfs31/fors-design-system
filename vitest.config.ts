import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    // Radix's overlay/positioning components (DropdownMenu, Tooltip) run
    // real focus-scope/portal/floating-ui measurement under jsdom, which has
    // no real layout engine — measured up to ~25s for the slowest case
    // (Tooltip + axe) even without coverage, and up to ~55s for that same
    // case *with* v8 coverage instrumentation's added overhead (measured in
    // isolation, not CPU contention) — genuinely correct, not hung.
    testTimeout: 90000,
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
      ],
      // Set a bit below the actual measured numbers (~99/90/87.5/99 as of
      // v1.0.0) so this is a real regression gate — catching a wholesale
      // untested addition or a broken branch — not a wall nobody's verified
      // passes. Bump these up as coverage genuinely improves, never down.
      thresholds: {
        statements: 95,
        lines: 95,
        branches: 85,
        functions: 80,
      },
    },
  },
});
