import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/cn";

/** On/off toggle for immediate-effect settings (vs. Checkbox, for form selections that need explicit submission). */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-ink-border bg-ink-surface-2 transition-colors duration-base",
      "focus-visible:outline-none focus-visible:shadow-focus-ring",
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full bg-fg transition-transform duration-base",
        // The thumb travels toward the logical end (right in LTR, left in
        // RTL) when checked. `translateX` is always a physical pixel
        // offset — Tailwind has no logical translate utility — so both
        // directions need their own explicit, sign-flipped value rather
        // than relying on one to fall through as a default.
        "ltr:translate-x-1 rtl:-translate-x-1",
        "ltr:data-[state=checked]:translate-x-6 rtl:data-[state=checked]:-translate-x-6",
        "data-[state=checked]:bg-accent-fg"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
