---
"@marcfs31/design-system": minor
---

Add `Command`/`CommandDialog` — a searchable, filterable command palette built on `cmdk`, for use in place of `Select` when a list is long, filterable, or mixes action types. `CommandDialog` opens `Command` as a modal palette on top of this repo's own `Dialog`.

`DialogContent` also gains an optional `hideClose` prop (default `false`, fully backward-compatible) for chrome-free modal surfaces like `CommandDialog` that rely on Escape to close instead of a visible close button.
