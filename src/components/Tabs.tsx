import * as React from "react";
import { cn } from "../lib/cn";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* components must be rendered inside <Tabs.Root>");
  return ctx;
}

export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value of the initially active tab (uncontrolled). */
  defaultValue: string;
  /** Active tab value (controlled). */
  value?: string;
  onValueChange?: (value: string) => void;
}

function Root({ className, defaultValue, value, onValueChange, ...props }: TabsRootProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  const setValue = React.useCallback(
    (v: string) => {
      setInternal(v);
      onValueChange?.(v);
    },
    [onValueChange]
  );
  return (
    <TabsContext.Provider value={{ value: active, setValue }}>
      <div className={cn("flex flex-col gap-3", className)} {...props} />
    </TabsContext.Provider>
  );
}

function List({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-md border border-ink-border bg-ink-surface p-1",
        className
      )}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function Trigger({ className, value, ...props }: TabsTriggerProps) {
  const { value: active, setValue } = useTabsContext();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => setValue(value)}
      className={cn(
        "rounded-sm px-3 py-1.5 font-sans text-sm font-medium transition-colors duration-base focus-visible:outline-none focus-visible:shadow-focus-ring",
        selected ? "bg-accent text-accent-fg" : "text-fg-secondary hover:text-fg",
        className
      )}
      {...props}
    />
  );
}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function Panel({ className, value, ...props }: TabsPanelProps) {
  const { value: active } = useTabsContext();
  if (active !== value) return null;
  return <div role="tabpanel" className={cn("font-sans text-sm text-fg", className)} {...props} />;
}

/**
 * Compound tabbed navigation: `<Tabs.Root>` holds state, `<Tabs.List>`
 * wraps `<Tabs.Trigger value="...">` buttons, and each `<Tabs.Panel value="...">`
 * renders only when its value is active.
 */
export const Tabs = { Root, List, Trigger, Panel };
