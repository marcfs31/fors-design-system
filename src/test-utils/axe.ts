import { configureAxe } from "vitest-axe";

/**
 * jsdom has no real layout/paint engine, so axe-core's `color-contrast`
 * check either logs noisy `getComputedStyle`/canvas "not implemented"
 * errors or hangs outright measuring pseudo-element text — a well-known
 * jsdom limitation, not a real accessibility signal. Contrast is already
 * covered precisely by src/tokens/__tests__/contrast.test.ts against the
 * actual token values, so it's disabled here to avoid duplicate, unreliable
 * coverage. Every other axe rule (ARIA roles/names, labels, structure) still
 * runs normally.
 */
export const axe = configureAxe({
  rules: { "color-contrast": { enabled: false } },
});
