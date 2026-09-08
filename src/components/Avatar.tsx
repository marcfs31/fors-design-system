import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-surface-2 font-heading font-medium text-fg-secondary",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** 1-2 letter fallback shown when `src` is absent or fails to load. */
  initials?: string;
}

/** Circular user/entity representation with an image or initials fallback. */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, initials, ...props }, ref) => {
    const [errored, setErrored] = React.useState(false);
    const showImage = src && !errored;
    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...(alt && !showImage && { role: "img", "aria-label": alt })}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ""}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <span aria-hidden={!!alt}>{initials}</span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a "+N" bubble for any avatars beyond this count instead of an unbounded row. */
  max?: number;
}

/**
 * Overlapping row of Avatars — collaborators on a project, meeting
 * attendees. Pass plain `<Avatar>` children (md size reads best); set
 * `max` to cap the row and collapse the rest into a "+N" bubble.
 */
export function AvatarGroup({ className, max, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max && items.length > max ? items.length - max : 0;
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visible.map((child, i) => (
        <div key={i} className={cn("rounded-full ring-2 ring-ink-bg", i > 0 && "-ms-2")}>
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="-ms-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-surface-2 font-heading text-sm font-medium text-fg-secondary ring-2 ring-ink-bg"
          role="img"
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
