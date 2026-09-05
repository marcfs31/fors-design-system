/**
 * Theme-switching primitives. This package ships tokens for both themes but
 * does not own the consumer's <html> element and has no ThemeProvider —
 * each app decides its own persistence (localStorage, cookie, account
 * setting) and switcher UI, then calls these two functions.
 */

export const FORS_THEMES = ["dark", "light"] as const;
export type ForsTheme = (typeof FORS_THEMES)[number];

/** Sets the `data-theme` attribute that every Fors token resolves against. */
export function applyForsTheme(
  theme: ForsTheme,
  target: HTMLElement = document.documentElement
): void {
  target.setAttribute("data-theme", theme);
}

export interface ForsAntiFlashOptions {
  /** localStorage key the consuming app stores its chosen theme under. */
  storageKey?: string;
  /** Valid theme values to accept from storage — defaults to both Fors themes. */
  themes?: readonly string[];
}

/**
 * Returns an inline-script string to embed in the consumer's own root
 * layout `<head>`/`<html>` (e.g. a Next.js root layout), so the stored theme
 * applies before first paint and there's no flash of the wrong theme.
 * Mirrors the standard anti-flash-script pattern, exported here as a
 * parameterized utility instead of something every app hand-copies.
 */
export function forsAntiFlashScript(opts: ForsAntiFlashOptions = {}): string {
  const storageKey = opts.storageKey ?? "fors-theme";
  const themes = opts.themes ?? FORS_THEMES;
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});var themes=${JSON.stringify(
    themes
  )};if(t&&themes.indexOf(t)!==-1){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
}
