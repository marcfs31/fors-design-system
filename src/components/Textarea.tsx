import * as React from "react";
import { cn } from "../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders the field in its error state with a danger-colored border. */
  invalid?: boolean;
  /** Compact helper/error text shown below the field. */
  hint?: string;
}

/**
 * Multi-line text field — same invalid/hint contract as `Input`. Defaults
 * to a 4-row minimum height; pass `rows` to change it.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, hint, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const hintId = React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full resize-y rounded-md border bg-ink-surface px-3 py-2 text-sm font-sans text-fg placeholder:text-fg-muted transition-colors duration-base",
            "focus-visible:outline-none focus-visible:shadow-focus-ring",
            invalid
              ? "border-danger focus-visible:border-danger"
              : "border-ink-border focus-visible:border-accent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? hintId : undefined}
          {...props}
        />
        {hint && (
          <span
            id={hintId}
            className={cn("text-xs font-sans", invalid ? "text-danger" : "text-fg-muted")}
          >
            {hint}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
