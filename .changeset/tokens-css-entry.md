---
"@marcfs31/fors-design-system": minor
---

Ship the design tokens on their own, as `@marcfs31/fors-design-system/tokens.css`. Consumers who compile their own CSS — a Tailwind v4 app using the `@theme` entry, or an app that only wants the palette — can now take the custom properties without also pulling in the compiled component layer from `styles.css`.
