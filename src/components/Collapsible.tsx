import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../lib/cn";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

/**
 * Single show/hide section — a "Show more" toggle, an optional
 * advanced-settings block. Compose as `<Collapsible><CollapsibleTrigger
 * asChild><Button variant="ghost">Show more</Button></CollapsibleTrigger>
 * <CollapsibleContent>...</CollapsibleContent></Collapsible>`. For a set of
 * Q&A-style sections where one (or several) should be open at a time, use
 * `Accordion` instead — it's built on this same primitive but manages a
 * whole group of them together.
 */
export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
    {...props}
  >
    <div className={cn("pt-2", className)}>{children}</div>
  </CollapsiblePrimitive.Content>
));
CollapsibleContent.displayName = "CollapsibleContent";
