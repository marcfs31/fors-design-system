import { afterEach, describe, expect, it, vi } from "vitest";
import { FORS_THEMES, applyForsTheme, forsAntiFlashScript } from "../index";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
});

describe("applyForsTheme", () => {
  it("sets data-theme on <html> by default", () => {
    applyForsTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("sets data-theme on a custom target element", () => {
    const el = document.createElement("div");
    applyForsTheme("dark", el);
    expect(el.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("accepts an app-defined theme name beyond the built-ins", () => {
    // Apps may define extra themes by overriding --fors-* under their own
    // [data-theme="…"] block; the helper must not reject those at the type
    // or runtime level.
    applyForsTheme("synthwave");
    expect(document.documentElement.getAttribute("data-theme")).toBe("synthwave");
  });
});

describe("forsAntiFlashScript", () => {
  it("applies the stored theme before paint when a valid value is present", () => {
    localStorage.setItem("fors-theme", "light");
    new Function(forsAntiFlashScript())();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("does nothing when localStorage has no stored theme", () => {
    new Function(forsAntiFlashScript())();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("does nothing when the stored value isn't a recognized theme", () => {
    localStorage.setItem("fors-theme", "solarized");
    new Function(forsAntiFlashScript())();
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("honors a custom storageKey and theme list", () => {
    localStorage.setItem("acme-theme", "midnight");
    new Function(forsAntiFlashScript({ storageKey: "acme-theme", themes: ["midnight", "day"] }))();
    expect(document.documentElement.getAttribute("data-theme")).toBe("midnight");
  });

  it("defaults to accepting exactly FORS_THEMES", () => {
    const script = forsAntiFlashScript();
    for (const theme of FORS_THEMES) {
      expect(script).toContain(theme);
    }
  });

  it("escapes values so the script can't break out of an inline <script>", () => {
    const script = forsAntiFlashScript({
      storageKey: "</script><img src=x onerror=alert(1)>",
      themes: ["dark\u2028", "light</script>"],
    });
    expect(script).not.toContain("</script>");
    expect(script).not.toContain("\u2028");
    expect(script).toContain("\\u003c/script>");
    // Still a valid JS program whose literals round-trip to the original values.
    const localStorage = { getItem: () => "light</script>" };
    const documentElement = { setAttribute: vi.fn() };
    new Function("localStorage", "document", script)(localStorage, { documentElement });
    expect(documentElement.setAttribute).toHaveBeenCalledWith("data-theme", "light</script>");
  });
});
