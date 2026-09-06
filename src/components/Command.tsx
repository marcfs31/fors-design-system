import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../lib/cn";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./Dialog";

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

/**
 * Searchable, filterable list of commands or options — reach for this over
 * `Select` when the list is long, filterable, or mixes different action
 * types; use `Select` for a short, fully-known list with no search need.
 * Always pass a `label` describing what this command list is for — it's
 * rendered visually hidden but is the list's accessible name for screen
 * readers. Compose as `<Command label="..."><CommandInput
 * placeholder="..." /><CommandList><CommandEmpty>No results.</CommandEmpty>
 * <CommandGroup heading="..."><CommandItem>...</CommandItem></CommandGroup>
 * </CommandList></Command>`, or wrap in `CommandDialog` to open it from a
 * trigger as a modal palette.
 */
export const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, CommandProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md border border-ink-border bg-ink-surface text-fg shadow-md",
        className
      )}
      {...props}
    />
  )
);
Command.displayName = "Command";

export interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  /** Accessible name for the palette, read by screen readers only (not shown visibly). Always override with copy specific to what this palette does. */
  label?: string;
  /** Visually hidden description announced when the dialog opens. */
  description?: string;
  /** Class applied to the dialog's content panel. */
  className?: string;
}

/**
 * `Command` opened from a trigger as a modal palette — built on this repo's
 * own `Dialog` (not cmdk's built-in dialog wrapper) so every modal in the
 * system shares one overlay/animation/focus-trap implementation. Has no
 * visible close button (`DialogContent`'s `hideClose`): closing via Escape is
 * the universal command-palette convention, and a close affordance would
 * otherwise overlap the search input's full-width row.
 */
export function CommandDialog({
  children,
  label = "Command palette",
  description = "Search for a command to run.",
  className,
  ...dialogProps
}: CommandDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent hideClose className={cn("max-w-lg overflow-hidden p-0", className)}>
        <DialogTitle className="sr-only">{label}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command label={label} className="rounded-none border-0 shadow-none">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Search field for `Command` — borderless, with a `border-b` divider before
 * the list rather than its own bordered box, so it reads as one continuous
 * panel with `Command`'s surface.
 */
export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-ink-border px-3">
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-fg-muted"
    >
      <path
        d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12.5 12.5 9.7 9.7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm font-sans text-fg outline-none placeholder:text-fg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

/** Scrollable results region. Capped relative to the viewport so it never overflows a short screen. */
export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[min(300px,60vh)] overflow-y-auto overflow-x-hidden p-1", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

/** Shown automatically by cmdk when a search yields no matches. */
export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm font-sans text-fg-muted"
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-fg [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-fg-muted",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-ink-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

/**
 * A single selectable result. Highlight/disabled styling reads cmdk's own
 * `aria-selected`/`aria-disabled` (not a `data-*` attribute — cmdk's
 * `data-selected`/`data-disabled` markers exist too, but the ARIA ones are
 * both authoritative for assistive tech and directly usable as Tailwind's
 * built-in `aria-*` variants).
 */
export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm font-sans text-fg outline-none",
      "aria-selected:bg-ink-surface-2 aria-selected:text-accent",
      "aria-disabled:pointer-events-none aria-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";
