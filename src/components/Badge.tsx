import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium font-sans",
  {
    variants: {
      variant: {
        neutral: "bg-ink-surface-2 text-fg-secondary border border-ink-border",
        accent: "bg-accent-subtle text-accent",
        spark: "bg-spark-subtle text-spark",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning",
        danger: "bg-danger-subtle text-danger",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/**
 * Small status/category label. Use `accent` for brand-relevant highlights,
 * `success`/`warning`/`danger` for state, `spark` for promotional tags,
 * and `neutral` as the default low-emphasis tag.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";
