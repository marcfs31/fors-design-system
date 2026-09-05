import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-md border p-4 shadow-lg duration-base " +
    "data-[swipe=move]:transition-none data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-out data-[swipe=end]:fade-out-80 " +
    "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:fade-in-0 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      variant: {
        default: "border-ink-border bg-ink-surface-2 text-fg",
        success: "border-success/30 bg-success-subtle text-success",
        danger: "border-danger/30 bg-danger-subtle text-danger",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn("fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-4", className)}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export interface ToastRootProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const ToastRoot = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastRootProps>(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  )
);
ToastRoot.displayName = "ToastRoot";

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("font-sans text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("font-sans text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label="Dismiss"
    className={cn("absolute right-2 top-2 rounded-sm opacity-60 transition-opacity duration-base hover:opacity-100", className)}
    {...props}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";

// --- useToast: minimal module-level toast queue (shadcn-style), no external state lib ---

interface ToastItem {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: VariantProps<typeof toastVariants>["variant"];
}

type Listener = (toasts: ToastItem[]) => void;
let toastState: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l(toastState));
}

export function toast(item: Omit<ToastItem, "id">): string {
  const id = crypto.randomUUID();
  toastState = [...toastState, { ...item, id }];
  emit();
  return id;
}

export function dismissToast(id: string): void {
  toastState = toastState.filter((t) => t.id !== id);
  emit();
}

/** Subscribes to the shared toast queue — `toasts` drives what `<Toaster>` renders. */
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>(toastState);
  React.useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);
  return { toasts, toast, dismiss: dismissToast };
}

/**
 * Renders the live toast queue. Mount once near the root of the app;
 * elsewhere, call the exported `toast({ title, description, variant })`
 * function to enqueue one.
 */
export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, variant }) => (
        <ToastRoot key={id} variant={variant} onOpenChange={(open) => !open && dismiss(id)}>
          <div className="flex-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </ToastRoot>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
