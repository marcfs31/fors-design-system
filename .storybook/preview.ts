import type { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/globals.css";

/**
 * A real theme toolbar, not a fixed "backgrounds" swatch: the Storybook
 * backgrounds addon paints a hardcoded color behind every story regardless
 * of `data-theme`, which silently breaks light-theme stories (dark text on
 * a backdrop still forced dark). Instead this sets `data-theme` on the
 * preview iframe's own <html> so the real token cascade (including body's
 * `background-color: var(--fors-ink-bg)` from globals.css) does the work,
 * matching how a real consuming app renders.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Fors theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "light", title: "Light", icon: "sun" },
        ],
        dynamicTitle: true,
      },
    },
    dir: {
      description: "Text direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR", icon: "arrowright" },
          { value: "rtl", title: "RTL", icon: "arrowleft" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
    dir: "ltr",
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute("data-theme", context.globals.theme ?? "dark");
      document.documentElement.dir = context.globals.dir ?? "ltr";
      return React.createElement(Story);
    },
  ],
};

export default preview;
