import "@testing-library/jest-dom/vitest";
// vitest-axe@0.1.0's own type augmentation targets a pre-Vitest-2 global `Vi`
// namespace and doesn't merge with this Vitest version's `Assertion`
// interface — see src/test-types.d.ts for the real augmentation. Its root
// "matchers" subpath also re-exports types with `export type *`, which makes
// `toHaveNoViolations` unusable as a value from there — import the real
// (non-type-only) declaration straight from dist instead.
import { toHaveNoViolations } from "vitest-axe/dist/matchers.js";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend({ toHaveNoViolations });

// RTL's own auto-cleanup only registers when it detects test-framework
// globals (afterEach on `globalThis`) — this project runs with
// `test.globals: false` and explicit vitest imports, so it never fires
// without this.
afterEach(() => {
  cleanup();
});

/**
 * jsdom doesn't implement these — Radix's overlay/select primitives call
 * them during pointer interaction and layout, so tests crash without a
 * no-op polyfill even though nothing here is actually asserted on.
 */
if (!window.HTMLElement.prototype.hasPointerCapture) {
  window.HTMLElement.prototype.hasPointerCapture = () => false;
}
if (!window.HTMLElement.prototype.setPointerCapture) {
  window.HTMLElement.prototype.setPointerCapture = () => {};
}
if (!window.HTMLElement.prototype.releasePointerCapture) {
  window.HTMLElement.prototype.releasePointerCapture = () => {};
}
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}
if (!("ResizeObserver" in window)) {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error test-only polyfill
  window.ResizeObserver = ResizeObserverMock;
}
