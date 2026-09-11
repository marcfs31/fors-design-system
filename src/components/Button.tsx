import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans font-medium transition-colors duration-base disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:shadow-focus-ring",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-active",
        secondary:
          "bg-ink-surface-2 text-fg border border-ink-border hover:border-accent hover:text-accent",
        spark: "bg-spark text-spark-fg hover:bg-spark-hover",
        ghost: "bg-transparent text-fg-secondary hover:bg-ink-surface-2 hover:text-fg",
        danger: "bg-danger text-danger-fg hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Icon or spinner rendered before the label. Ignored while `loading` (a Spinner takes its place). */
  leadingIcon?: React.ReactNode;
  /** Shows a spinner in place of `leadingIcon` and disables the button — for an in-flight async action. */
  loading?: boolean;
  /**
   * Render the styles onto the single child element instead of a `<button>` —
   * e.g. a router `<Link>` that should look like a button. `leadingIcon` and
   * `loading` are ignored in this mode (put the icon inside the child).
   */
  asChild?: boolean;
}

/**
 * Fors primary interactive control. Use `primary` for the single most
 * important action on a screen, `secondary` for supporting actions,
 * `spark` to draw extra attention (upsell, promo), `ghost` for low-emphasis
 * toolbar actions, and `danger` for destructive confirmations. Set `loading`
 * for an in-flight async action instead of manually swapping in a Spinner —
 * it also disables the button so it can't be double-submitted.
 *
 * Renders `data-fors="button"` so an app-level skin (e.g. an extra theme
 * defined in the consumer's CSS) can target Fors buttons specifically —
 * `[data-theme="x"] [data-fors="button"]` — without also catching the
 * `<button>`s Radix renders inside `Select`, `Dialog`, `Calendar`, etc.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, leadingIcon, loading, disabled, asChild, children, ...props },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-fors="button"
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-fors="button"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? <Spinner size="sm" aria-hidden="true" /> : leadingIcon}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
