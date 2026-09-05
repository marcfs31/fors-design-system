import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../lib/cn";
import { POPPER_ANIMATION_CLASSES } from "../lib/animation";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * Anchored panel for rich, interactive content (a filter form, a color
 * picker) — unlike `Tooltip` (hover, text-only) or `DropdownMenu`
 * (keyboard-navigable action list), a Popover's content is arbitrary and
 * only opens on click. Compose as `<Popover><PopoverTrigger asChild>
 * <Button variant="secondary">Filter</Button></PopoverTrigger>
 * <PopoverContent>...</PopoverContent></Popover>`. `PopoverContent` renders
 * `role="dialog"`, which WAI-ARIA requires an accessible name for — always
 * pass `aria-label` (e.g. `"Filter options"`) or `aria-labelledby`.
 */
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 max-w-[calc(100vw-2rem)] rounded-md border border-ink-border bg-ink-surface p-4 shadow-lg outline-none",
        POPPER_ANIMATION_CLASSES,
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
