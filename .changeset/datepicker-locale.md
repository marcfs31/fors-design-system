---
"@marcfs31/fors-design-system": minor
---

`DatePicker` accepts `locale` (a date-fns locale, forwarded to the `Calendar` grid and used for the trigger's date text) and `formatValue` (custom trigger text), so an app with a runtime language switch can show e.g. Spanish month names instead of the browser's default locale.
