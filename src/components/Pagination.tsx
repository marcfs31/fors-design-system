import * as React from "react";
import { cn } from "../lib/cn";

export function Pagination({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props} />
  );
}

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/**
 * Composable page-number/prev-next control. `<Pagination>` wraps
 * `<PaginationItem>` buttons (mark the current page with `active`) and
 * `<PaginationEllipsis>` for skipped ranges — the caller supplies the page
 * numbers and click handlers, this only renders the strip.
 */
export const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 font-sans text-sm font-medium transition-colors duration-base",
        "focus-visible:outline-none focus-visible:shadow-focus-ring",
        active
          ? "bg-accent text-accent-fg"
          : "text-fg-secondary hover:bg-ink-surface-2 hover:text-fg",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-9 w-9 items-center justify-center font-sans text-sm text-fg-muted",
        className
      )}
      {...props}
    >
      …
    </span>
  );
}
