import * as React from "react";

/** Any Fors design token, as it is named in CSS (`--fors-accent`, `--fors-ink-bg`, …). */
export type ForsTokenName = `--fors-${string}`;

// A custom property name can never contain a comma, so joining on one is a
// lossless identity for a set of token names.
const NAME_SEPARATOR = ",";

function parseKey(key: string): ForsTokenName[] {
  return key === "" ? [] : (key.split(NAME_SEPARATOR) as ForsTokenName[]);
}

function readTokens(names: readonly ForsTokenName[]): Record<string, string> {
  const style = getComputedStyle(document.documentElement);
  const values: Record<string, string> = {};
  for (const name of names) values[name] = style.getPropertyValue(name).trim();
  return values;
}

function sameValues(a: Record<string, string>, b: Record<string, string>): boolean {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((key) => a[key] === b[key]);
}

function subscribe(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });
  return () => observer.disconnect();
}

/**
 * Read Fors design tokens as resolved strings, re-reading whenever the theme
 * changes.
 *
 * Use it only where a `var(--fors-*)` reference cannot work. The usual case is
 * a charting library: SVG presentation attributes (`stroke`, `fill`,
 * `stopColor`) reject `var()`, so libraries like Recharts, Visx and Nivo need
 * the computed value. Everywhere else — normal styling, CSS properties — use
 * the Tailwind token classes or `var(--fors-accent)` directly, which follow the
 * theme for free.
 *
 * Pass the names as a `const` tuple so the returned record is typed per token:
 *
 * ```tsx
 * const t = useForsTokens(["--fors-accent", "--fors-fg-secondary"] as const);
 * <Line stroke={t["--fors-accent"]} />
 * ```
 *
 * Values update when `data-theme`, `class` or the inline `style` of `<html>`
 * changes, which covers the `applyForsTheme()` toggle and any app-level token
 * override layered on top of it. During server rendering every token reads as
 * an empty string and the real values arrive on hydration, so give a chart a
 * sensible fallback if it must paint something before that.
 */
export function useForsTokens<const T extends readonly ForsTokenName[]>(
  names: T
): Record<T[number], string> {
  // The call site almost always passes a fresh array literal, so identity is
  // useless as a dependency — the joined names are the real identity.
  const key = names.join(NAME_SEPARATOR);
  const cache = React.useRef<{ key: string; values: Record<string, string> } | null>(null);

  const getSnapshot = React.useCallback(() => {
    const next = readTokens(parseKey(key));
    const cached = cache.current;
    // useSyncExternalStore re-renders on snapshot identity, so hand back the
    // previous object whenever the values are unchanged — otherwise every
    // unrelated <html> attribute mutation would re-render every chart.
    if (cached && cached.key === key && sameValues(cached.values, next)) return cached.values;
    cache.current = { key, values: next };
    return next;
  }, [key]);

  const serverValues = React.useMemo(
    () => Object.fromEntries(parseKey(key).map((name) => [name, ""])),
    [key]
  );
  const getServerSnapshot = React.useCallback(() => serverValues, [serverValues]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as Record<
    T[number],
    string
  >;
}
