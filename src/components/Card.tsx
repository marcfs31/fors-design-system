import * as React from "react";
import { cn } from "../lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adds hover styling (border highlight) to suggest the card is interactive.
   * **Note**: This is visual only — the component does not handle clicks or
   * keyboard navigation. Wrap the card in a `<button>`, `<a>`, or add
   * `role`/`tabIndex` to enable real interactivity.
   */
  interactive?: boolean;
}

/** Surface container for grouped content — the base layout primitive. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-ink-border bg-ink-surface p-5 shadow-sm",
        interactive && "transition-colors duration-base hover:border-accent cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-3 flex flex-col gap-1", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * Card section heading, always rendered as an `<h3>`. Ensure this fits
 * the document heading outline where used; override with `className` or
 * wrap/replace if a different level is needed (e.g., on a page where
 * `CardTitle` is the main `<h1>`).
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-lg font-semibold text-fg", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-sans text-sm text-fg-secondary", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-sans text-sm text-fg", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4 flex items-center gap-2", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
