---
"@marcfs31/design-system": patch
---

RTL (`dir="rtl"`) support: hardcoded physical-direction classes (`text-left`, `ml-*`, `pl-*`/`pr-*`, `right-*`, `border-r`, `-ml-*`) across `Accordion`, `Table`, `Select`, `Dialog`, `Avatar`, and `Sidebar` are now logical-property equivalents (`text-start`, `ms-*`, `ps-*`/`pe-*`, `end-*`, `border-e`, `-ms-*`), and `Switch`'s thumb travel and `Sidebar`'s mobile-drawer slide animation now use explicit `rtl:`/`ltr:` variants. No API changes — purely internal styling.

`Toast` is a deliberate, documented exception: its swipe-to-dismiss gesture and resting position are tied together by a hardcoded physical `swipeDirection`, and making that RTL-aware needs a runtime direction-detection mechanism this repo doesn't have yet. `DropdownMenu`/`Popover`/`Tooltip` needed no changes — their positioning already reads Radix's own viewport-relative `data-side`, not text direction.

Storybook gains a `dir` toolbar (mirroring the existing theme toggle) and a `KitchenSinkRTL` story for whole-system verification.
