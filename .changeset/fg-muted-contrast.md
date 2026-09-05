---
"@marcfs31/design-system": patch
---

Fix `--fors-fg-muted` (dark theme) failing WCAG AA contrast on `ink-surface` and `ink-surface-2` — it only cleared 4.5:1 against the base `ink-bg`. Nudged `#75818d` → `#8a95a1` (now ≥ 5.2:1 on every ink surface). Caught by the new full-browser axe pass on the Table header, which renders `text-fg-muted` on `ink-surface-2`. The token-contrast test now checks `fg-muted` and `fg-secondary` against all three ink surfaces so this can't regress. `ToastDescription` also switched from `opacity-90` (which tipped `text-danger` under AA in the danger toast) to solid `text-fg-secondary`.
