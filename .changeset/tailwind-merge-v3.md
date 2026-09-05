---
"@marcfs31/design-system": patch
---

Bump `tailwind-merge` to 3.6.0 (a runtime dependency of the `cn()` helper). Verified against the full test suite (unit + DOM snapshots + Storybook test runner) with no output changes — the class-merging behavior for every component is identical.
