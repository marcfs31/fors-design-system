---
"@marcfs31/design-system": minor
---

Full accessibility (WCAG 2.1 AA) and responsiveness hardening pass across every component.

Accessibility:

- `Tabs` reworked to the complete WAI-ARIA Tabs pattern: roving `tabIndex`, Arrow/Home/End keyboard navigation with disabled-trigger skipping and wrapping, `id`↔`aria-controls`/`aria-labelledby` wiring between each trigger and panel, focusable panels, and an `orientation` prop.
- `Input` / `Textarea`: `hint` text is now linked to the control via `aria-describedby` so screen readers announce it.
- `Alert`: new `assertive` prop switching the live region to `role="alert"`; defaults to `true` when `variant="danger"`.
- `Avatar`: keeps its accessible name (via `role="img"` + `aria-label`) when the image fails and it falls back to initials; `AvatarGroup`'s "+N" bubble is now labelled ("N more").
- `Checkbox` / `RadioGroup` controls enlarged to a 24×24px minimum touch target (WCAG 2.5.8); `Dialog` and `Toast` close buttons padded to a real hit area.
- `Breadcrumb` current-page marker simplified to a plain `aria-current="page"` span (no more `role="link"` + `aria-disabled`).
- `Table` column headers now carry `scope="col"`.

Responsiveness — every component is usable at 320/768/1280px with no forced horizontal page scroll:

- `Dialog` content capped to `w-[calc(100vw-2rem)]` with internal scroll for tall content; `DropdownMenu`, `Popover`, and `Toast` viewports capped to the viewport width with a gutter.
- `Table` renders inside a horizontal scroll container instead of overflowing the page.
- `Tabs` list scrolls when it overflows; `Pagination` wraps.
