/**
 * Shared enter/exit motion for Radix's Popper-positioned overlays
 * (DropdownMenu, Select popper mode, Tooltip, Popover) — fades and scales
 * in, plus a small directional slide read from Radix's own `data-side`.
 * Respects `prefers-reduced-motion` for free via the global override in
 * globals.css, which collapses every animation/transition duration to
 * ~0 regardless of what's set here.
 */
export const POPPER_ANIMATION_CLASSES =
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-base";
