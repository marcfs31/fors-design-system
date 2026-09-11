---
"@marcfs31/fors-design-system": minor
---

Add the `useForsTokens` hook, which resolves `--fors-*` design tokens to their computed values and re-reads them when the theme changes. It exists for charting libraries: SVG presentation attributes (`stroke`, `fill`, `stopColor`) reject `var()`, so Recharts and friends need the resolved string. Built on `useSyncExternalStore`, so it renders on the server (tokens read as empty strings) and hydrates without a mismatch, and it keeps snapshot identity stable so an unrelated `<html>` attribute change does not re-render every chart.
