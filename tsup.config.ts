import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // ESM is the primary target; the CJS build is a compatibility shim so
  // `require()` from CommonJS tooling still resolves (validated by
  // `npm run test:package`).
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
