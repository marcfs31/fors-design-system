#!/usr/bin/env node
/**
 * Verifies the actual compiled artifact in dist/ — not src/ — imports
 * cleanly and exposes the expected public API. Unit tests import from src
 * via Vite/Vitest's own transform pipeline, which can't catch a build-only
 * regression (a broken tsup config, an export that got tree-shaken away, a
 * malformed exports map, a styles.css that never got the Tailwind pass).
 * Run after `npm run build`, before anything gets published.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const distIndex = path.join(root, "dist/index.js");
const distTypes = path.join(root, "dist/index.d.ts");
const distStyles = path.join(root, "dist/styles.css");

let failures = 0;
function check(label, fn) {
  try {
    const result = fn();
    if (result === false) throw new Error("assertion returned false");
    console.log(`  ✓ ${label}`);
  } catch (err) {
    failures++;
    console.error(`  ✗ ${label}\n    ${err.message}`);
  }
}

console.log("Smoke-testing dist/ artifact...\n");

check("dist/index.js exists", () => existsSync(distIndex));
check("dist/index.d.ts exists", () => existsSync(distTypes));
check("dist/styles.css exists", () => existsSync(distStyles));

const mod = await import(path.resolve(distIndex));

const EXPECTED_COMPONENT_EXPORTS = [
  "Button",
  "Badge",
  "Input",
  "Textarea",
  "Card",
  "Alert",
  "Avatar",
  "AvatarGroup",
  "Tabs",
  "Heading",
  "Text",
  "Checkbox",
  "RadioGroup",
  "RadioGroupItem",
  "Switch",
  "Select",
  "Dialog",
  "DropdownMenu",
  "Tooltip",
  "Toaster",
  "Spinner",
  "Table",
  "Progress",
  "Popover",
  "Accordion",
  "Slider",
  "Skeleton",
  "Breadcrumb",
  "Pagination",
];

for (const name of EXPECTED_COMPONENT_EXPORTS) {
  check(`exports "${name}"`, () => mod[name] !== undefined);
}

check(
  "exports theme utilities",
  () => typeof mod.applyForsTheme === "function" && typeof mod.forsAntiFlashScript === "function"
);
check(
  "FORS_THEMES contains dark and light",
  () => mod.FORS_THEMES.includes("dark") && mod.FORS_THEMES.includes("light")
);
check(
  "forsAntiFlashScript() returns a non-empty string",
  () => typeof mod.forsAntiFlashScript() === "string" && mod.forsAntiFlashScript().length > 0
);
check("exports cn helper", () => {
  const skip = false;
  return typeof mod.cn === "function" && mod.cn("a", skip && "b", "c") === "a c";
});

const css = readFileSync(distStyles, "utf8");
check(
  "styles.css was actually processed by Tailwind (no literal @tailwind directives left)",
  () => !css.includes("@tailwind")
);
check("styles.css contains compiled component styles", () => css.includes("--fors-accent"));
check("styles.css is non-trivial in size", () => statSync(distStyles).size > 1000);

console.log("");
if (failures > 0) {
  console.error(`${failures} smoke-test check(s) failed.`);
  process.exit(1);
}
console.log("All smoke-test checks passed.");
