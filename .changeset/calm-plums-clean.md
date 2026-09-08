---
"@marcfs31/design-system": minor
---

Add `Calendar`/`DatePicker` — a date grid built on `react-day-picker`, plus a compact popover-based date field for forms. Scoped to single-date selection for now; range selection is a documented follow-up.

**Bundle budget raised from 70 KB to 85 KB** (brotli, `dist/index.js`): `react-day-picker` pulls in `date-fns`/`@date-fns/tz`, adding a real, measured ~18 KB even after tree-shaking. This is a deliberate trade-off for shipping a genuine date picker rather than a hand-rolled one — real usage after this release is ~80 KB, leaving headroom for incidental growth.
