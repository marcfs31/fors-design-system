import { describe, expect, it } from "vitest";
import { FORS_PALETTES, type ForsPalette } from "../palettes";

const AA_NORMAL_TEXT = 4.5;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function channelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(channelToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexA);
  const lB = relativeLuminance(hexB);
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Every fg/bg pairing an existing component actually renders. */
function pairsFor(p: ForsPalette): Array<[string, string, string]> {
  return [
    ["fg on bg", p.fg, p.bg],
    ["fg on surface", p.fg, p.surface],
    ["fg-secondary on bg", p.fgSecondary, p.bg],
    ["fg-muted on bg", p.fgMuted, p.bg],

    ["accent-fg on accent", p.accentFg, p.accent],
    ["accent-fg on accent-hover", p.accentFg, p.accentHover],
    ["accent-fg on accent-active", p.accentFg, p.accentActive],
    ["accent (as text) on surface", p.accent, p.surface],
    ["accent (as text) on accent-subtle", p.accent, p.accentSubtle],
    ["accent (as text) on surface-2", p.accent, p.surface2],

    ["spark-fg on spark", p.sparkFg, p.spark],
    ["spark-fg on spark-hover", p.sparkFg, p.sparkHover],
    ["spark (as text) on spark-subtle", p.spark, p.sparkSubtle],

    ["danger-fg on danger", p.dangerFg, p.danger],
    ["danger (as text) on danger-subtle", p.danger, p.dangerSubtle],

    ["success-fg on success", p.successFg, p.success],
    ["success (as text) on success-subtle", p.success, p.successSubtle],

    ["warning-fg on warning", p.warningFg, p.warning],
    ["warning (as text) on warning-subtle", p.warning, p.warningSubtle],
  ];
}

describe("Fors token contrast (WCAG AA, 4.5:1)", () => {
  for (const [themeName, palette] of Object.entries(FORS_PALETTES)) {
    describe(`${themeName} theme`, () => {
      for (const [label, fg, bg] of pairsFor(palette)) {
        it(`${label} passes AA`, () => {
          const ratio = contrastRatio(fg, bg);
          expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
        });
      }
    });
  }
});
