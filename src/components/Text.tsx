import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const textVariants = cva("font-sans", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    tone: {
      default: "text-fg",
      secondary: "text-fg-secondary",
      muted: "text-fg-muted",
      accent: "text-accent",
      danger: "text-danger",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  /** Render as a different element — e.g. `"span"` for inline text. Defaults to `p`. */
  as?: "p" | "span" | "div" | "label";
}

/** Body text primitive. Use `tone` for hierarchy/state, not raw color utilities. */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, tone, weight, as = "p", ...props }, ref) => {
    const Element = as as React.ElementType;
    return (
      <Element
        ref={ref}
        className={cn(textVariants({ size, tone, weight }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
