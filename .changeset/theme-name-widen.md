---
"@marcfs31/fors-design-system": minor
---

`applyForsTheme` accepts any theme name (new `ForsThemeName = ForsTheme | (string & {})` type), so an app that defines extra themes by overriding the `--fors-*` tokens under its own `[data-theme="…"]` blocks can use the same helper instead of setting the attribute by hand. `forsAntiFlashScript({ themes })` already accepted arbitrary names.
