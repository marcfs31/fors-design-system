import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const alertVariants = cva("rounded-md border p-4 font-sans text-sm", {
  variants: {
    variant: {
      neutral: "border-ink-border bg-ink-surface-2 text-fg-secondary",
      accent: "border-accent/30 bg-accent-subtle text-accent",
      success: "border-success/30 bg-success-subtle text-success",
      warning: "border-warning/30 bg-warning-subtle text-warning",
      danger: "border-danger/30 bg-danger-subtle text-danger",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Bold lead-in line above the body text. */
  title?: string;
}

/**
 * Inline status/notice banner. Use `danger`/`warning`/`success` for
 * outcome feedback and `accent` for brand-toned informational callouts.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, ...props }, ref) => (
    <div ref={ref} role="status" className={cn(alertVariants({ variant }), className)} {...props}>
      {title && <p className="mb-1 font-semibold text-fg">{title}</p>}
      <div>{children}</div>
    </div>
  )
);
Alert.displayName = "Alert";
