import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib/cn";
import { POPPER_ANIMATION_CLASSES } from "../lib/animation";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Contextual action menu, opened from a trigger (typically a `ghost`
 * Button icon button). Compose as `<DropdownMenu><DropdownMenuTrigger
 * asChild><Button variant="ghost">⋯</Button></DropdownMenuTrigger>
 * <DropdownMenuContent><DropdownMenuItem onSelect={...}>Edit</DropdownMenuItem>
 * <DropdownMenuSeparator /><DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
 * </DropdownMenuContent></DropdownMenu>`.
 */
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[10rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-ink-border bg-ink-surface p-1 shadow-lg",
        POPPER_ANIMATION_CLASSES,
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  /** Renders the item in danger styling for destructive actions. */
  variant?: "default" | "danger";
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2.5 py-1.5 text-sm font-sans outline-none",
      variant === "danger"
        ? "text-danger data-[highlighted]:bg-danger-subtle"
        : "text-fg data-[highlighted]:bg-ink-surface-2",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-ink-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
