import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../lib/cn";

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

/**
 * Accessible field label — use this instead of a bare `<label>`. Clicking or
 * tapping it focuses/activates the associated control the same way a native
 * label does, whether that control is a plain `<input>`/`<textarea>` (via
 * `htmlFor` matching the control's `id`) or a Radix-based control that
 * renders a `<button>` under the hood (`Checkbox`, `Switch`,
 * `RadioGroupItem`) — those still need the same `htmlFor`/`id` pairing.
 */
export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("font-sans text-sm font-medium text-fg", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";
