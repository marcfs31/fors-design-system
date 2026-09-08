/** @type {import("next").NextConfig} */
export default {
  // The fixture lives inside the design-system repo, which has its own
  // lockfile; pin the workspace root so Next doesn't infer the parent.
  turbopack: { root: import.meta.dirname },
};
