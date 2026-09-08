import type { Config } from "tailwindcss";
import forsPreset from "./src/tailwind-preset";

/**
 * Repo-local Tailwind config (Storybook + the shipped styles.css build).
 * The token → utility mapping lives in src/tailwind-preset.ts, which is also
 * published for Tailwind v3 consumers; this file only adds the content scan.
 */
export default {
  presets: [forsPreset],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
} satisfies Config;
