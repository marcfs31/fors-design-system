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
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  /** Bold lead-in line above the body text. */
  title?: string;
  /**
   * Use an assertive live region (`role="alert"`) instead of the default polite
   * status role. Set this to `true` for urgent alerts like errors; leave `false`
   * or unset for informational/success statuses. Defaults to `true` when
   * `variant="danger"`.
   */
  assertive?: boolean;
  /**
   * Called when the user dismisses the alert. Passing this renders a close
   * button; omit it for an alert the user cannot get rid of. The component
   * stays controlled — it never hides itself, so the consumer owns the
   * visibility state and decides whether dismissal is permanent.
   */
  onDismiss?: () => void;
  /**
   * Accessible name for the close button. Override it in a localised app, or
   * to say what is being dismissed ("Dismiss import error"). Defaults to
   * "Dismiss"; only read when `onDismiss` is set.
   */
  dismissLabel?: string;
}

/**
 * Inline status/notice banner. Use `danger`/`warning`/`success` for
 * outcome feedback and `accent` for brand-toned informational callouts.
 * Renders a polite status region by default; use `assertive` or set it
 * automatically by passing `variant="danger"` for urgent alerts.
 *
 * Pass `onDismiss` for a banner the user can clear — a failed upload, a
 * one-off notice. The alert does not hide itself: keep the flag in state and
 * stop rendering it from the handler. For transient feedback that should
 * disappear on its own, reach for `toast()` instead of a dismissible alert.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      title,
      children,
      assertive = variant === "danger",
      onDismiss,
      dismissLabel = "Dismiss",
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role={assertive ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {onDismiss ? (
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {title && <p className="mb-1 font-semibold text-fg">{title}</p>}
            <div>{children}</div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            // Negative logical margins pull the 36px hit area into the banner's
            // own padding, so a dismissible alert is no taller than a plain one.
            className="-me-1 -mt-1 flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-sm opacity-80 transition-opacity duration-base hover:opacity-100 focus-visible:outline-none focus-visible:shadow-focus-ring"
          >
            {/* Inline, so the component bundle stays free of the icons entry's
                Lucide dependency — same approach as Dialog and Toast. */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          {title && <p className="mb-1 font-semibold text-fg">{title}</p>}
          <div>{children}</div>
        </>
      )}
    </div>
  )
);
Alert.displayName = "Alert";
