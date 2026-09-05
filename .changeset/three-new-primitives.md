---
"@marcfs31/design-system": minor
---

Three new components, filling gaps this repo's own usage kept surfacing:

- **`Separator`** — a divider between sections of content, decorative by default (`decorative={false}` for the rare case it's the only signal of a semantic boundary).
- **`Label`** — an accessible field label (wraps `@radix-ui/react-label`) so `htmlFor`/`id` correctly associates with any control, native or Radix-based — replaces every hand-rolled `<label className="...">` this design system's own stories had been using.
- **`Collapsible`** (+ `CollapsibleTrigger`, `CollapsibleContent`) — a single show/hide section (a "Show more" toggle, an optional advanced-settings block); `Accordion` is built on the same Radix primitive but manages a whole group, this is the standalone version.
