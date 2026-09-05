import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const headingVariants = cva("font-heading font-semibold text-fg", {
  variants: {
    size: {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
      "2xl": "text-4xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic heading level. Defaults to `h2` — set explicitly to keep document outline correct. */
  as?: HeadingElement;
}

/**
 * Page/section title, set in Space Grotesk. `as` controls the semantic
 * level (h1-h6); `size` controls the visual scale independently — pick
 * `as` for document structure and `size` for how it should look.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as: Comp = "h2", ...props }, ref) => (
    <Comp ref={ref} className={cn(headingVariants({ size }), className)} {...props} />
  )
);
Heading.displayName = "Heading";
