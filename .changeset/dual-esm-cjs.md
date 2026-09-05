---
"@marcfs31/design-system": minor
---

Ship a CommonJS build alongside ESM. `require("@marcfs31/design-system")` now resolves to `dist/index.cjs` with its own `dist/index.d.cts` types; ESM consumers are unchanged (`dist/index.js`). `publint` and `@arethetypeswrong/cli` both pass clean across `node10`, `node16` (CJS and ESM), and bundler resolution. Non-breaking — nothing was removed or renamed.
