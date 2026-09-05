import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../lib/cn";

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

/** Binary selection control. Built on Radix for correct keyboard/ARIA behavior. */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-6 w-6 shrink-0 rounded-sm border border-ink-border bg-ink-surface transition-colors duration-base",
      "focus-visible:outline-none focus-visible:shadow-focus-ring",
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-accent-fg">
      <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M1.5 5L4 7.5L8.5 2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
