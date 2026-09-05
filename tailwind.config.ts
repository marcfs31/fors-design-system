import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Fors Corporation design tokens, exposed as Tailwind utilities.
 * Raw values live in src/styles/tokens.css as CSS custom properties —
 * this file just maps them into the `bg-*`/`text-*`/`border-*` utility vocabulary.
 */
export default {
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: "var(--fors-ink-bg)",
          surface: "var(--fors-ink-surface)",
          "surface-2": "var(--fors-ink-surface-2)",
          border: "var(--fors-ink-border)",
          "border-subtle": "var(--fors-ink-border-subtle)",
        },
        fg: {
          DEFAULT: "var(--fors-fg)",
          secondary: "var(--fors-fg-secondary)",
          muted: "var(--fors-fg-muted)",
        },
        accent: {
          DEFAULT: "var(--fors-accent)",
          hover: "var(--fors-accent-hover)",
          active: "var(--fors-accent-active)",
          subtle: "var(--fors-accent-subtle)",
          fg: "var(--fors-accent-fg)",
        },
        spark: {
          DEFAULT: "var(--fors-spark)",
          hover: "var(--fors-spark-hover)",
          subtle: "var(--fors-spark-subtle)",
          fg: "var(--fors-spark-fg)",
        },
        danger: {
          DEFAULT: "var(--fors-danger)",
          subtle: "var(--fors-danger-subtle)",
          fg: "var(--fors-danger-fg)",
        },
        success: {
          DEFAULT: "var(--fors-success)",
          subtle: "var(--fors-success-subtle)",
          fg: "var(--fors-success-fg)",
        },
        warning: {
          DEFAULT: "var(--fors-warning)",
          subtle: "var(--fors-warning-subtle)",
          fg: "var(--fors-warning-fg)",
        },
        "focus-ring": "var(--fors-focus-ring)",
      },
      fontFamily: {
        heading: "var(--fors-font-heading)",
        sans: "var(--fors-font-sans)",
        mono: "var(--fors-font-mono)",
      },
      borderRadius: {
        sm: "var(--fors-radius-sm)",
        md: "var(--fors-radius-md)",
        lg: "var(--fors-radius-lg)",
        xl: "var(--fors-radius-xl)",
      },
      transitionDuration: {
        fast: "var(--fors-duration-fast)",
        base: "var(--fors-duration-base)",
      },
      boxShadow: {
        sm: "var(--fors-shadow-sm)",
        md: "var(--fors-shadow-md)",
        lg: "var(--fors-shadow-lg)",
        "focus-ring": "0 0 0 3px var(--fors-focus-ring)",
      },
      keyframes: {
        // tailwindcss-animate's fade/zoom/slide utilities cover every other
        // overlay; Accordion animates a measured height instead, which
        // needs its own keyframes reading Radix's own CSS variable.
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--fors-duration-base) ease-out",
        "accordion-up": "accordion-up var(--fors-duration-base) ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
