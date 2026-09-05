import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/cn";

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "aria-label"
> {
  /**
   * Accessible name for the thumb(s) — each Thumb is its own `role="slider"`
   * element, so this must land there, not on the invisible Root. A single
   * string labels every thumb identically (fine for one thumb); pass an
   * array for a range slider where each thumb needs a distinct name (e.g.
   * `["Minimum price", "Maximum price"]`).
   */
  "aria-label"?: string | string[];
}

/** Numeric range input — volume, price range, capacity thresholds. Supports one thumb or a range via `defaultValue={[a, b]}`. */
export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, "aria-label": ariaLabel, ...props }, ref) => {
    const values = props.defaultValue ?? props.value ?? [0];
    const labelFor = (i: number) => (Array.isArray(ariaLabel) ? ariaLabel[i] : ariaLabel);
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-ink-surface-2">
          <SliderPrimitive.Range className="absolute h-full bg-accent" />
        </SliderPrimitive.Track>
        {values.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={labelFor(i)}
            className="block h-4 w-4 rounded-full border-2 border-accent bg-ink-surface shadow-sm transition-colors duration-base focus-visible:outline-none focus-visible:shadow-focus-ring disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = "Slider";
