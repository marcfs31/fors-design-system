import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Loading placeholder block — shape it with width/height utilities
 * (`className="h-4 w-32"` for a text line, `"h-10 w-10 rounded-full"` for
 * an avatar) to match the content it's standing in for.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-ink-surface-2", className)}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";
