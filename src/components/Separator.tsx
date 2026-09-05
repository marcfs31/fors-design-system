import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../lib/cn";

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

/**
 * Visual divider between sections of content — a card footer from its body,
 * items in a list, a toolbar's groups. Decorative by default (`aria-hidden`,
 * since the visual boundary is redundant with the surrounding structure);
 * pass `decorative={false}` on the rare occasion the separator is the *only*
 * signal of a semantic boundary, which gives it `role="separator"` instead.
 * `orientation="vertical"` needs an explicit height from its container (a
 * flex row with items sized by their content, typically).
 */
export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    className={cn(
      "shrink-0 bg-ink-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";
