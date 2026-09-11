import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import * as React from "react";
import { useForsTokens } from "./useForsTokens";

function setTokens(values: Record<string, string>) {
  for (const [name, value] of Object.entries(values)) {
    document.documentElement.style.setProperty(name, value);
  }
}

function Probe({
  names,
  onRender,
}: {
  names: readonly `--fors-${string}`[];
  onRender?: () => void;
}) {
  const tokens = useForsTokens(names as never);
  onRender?.();
  return <output data-testid="tokens">{JSON.stringify(tokens)}</output>;
}

function readProbe(): Record<string, string> {
  return JSON.parse(screen.getByTestId("tokens").textContent!);
}

afterEach(() => {
  document.documentElement.removeAttribute("style");
  document.documentElement.removeAttribute("data-theme");
});

describe("useForsTokens", () => {
  it("resolves each requested token to its computed value", () => {
    setTokens({ "--fors-accent": "#2dd4bf", "--fors-ink-bg": "#0b0f14" });
    render(<Probe names={["--fors-accent", "--fors-ink-bg"] as const} />);
    expect(readProbe()).toEqual({ "--fors-accent": "#2dd4bf", "--fors-ink-bg": "#0b0f14" });
  });

  it("trims the whitespace a CSS declaration leaves behind", () => {
    setTokens({ "--fors-accent": "  #2dd4bf  " });
    render(<Probe names={["--fors-accent"] as const} />);
    expect(readProbe()["--fors-accent"]).toBe("#2dd4bf");
  });

  it("returns an empty string for a token that is not defined", () => {
    render(<Probe names={["--fors-not-a-real-token"] as const} />);
    expect(readProbe()["--fors-not-a-real-token"]).toBe("");
  });

  it("re-reads when the theme attribute changes", async () => {
    setTokens({ "--fors-accent": "#2dd4bf" });
    render(<Probe names={["--fors-accent"] as const} />);

    await act(async () => {
      document.documentElement.setAttribute("data-theme", "light");
      setTokens({ "--fors-accent": "#0f766e" });
    });

    expect(readProbe()["--fors-accent"]).toBe("#0f766e");
  });

  it("does not re-render when an unrelated attribute changes", async () => {
    setTokens({ "--fors-accent": "#2dd4bf" });
    const onRender = vi.fn();
    render(<Probe names={["--fors-accent"] as const} onRender={onRender} />);
    const rendersBefore = onRender.mock.calls.length;

    await act(async () => {
      document.documentElement.classList.add("modal-open");
    });

    expect(onRender.mock.calls.length).toBe(rendersBefore);
  });

  it("stops observing when the consumer unmounts", () => {
    const disconnect = vi.spyOn(MutationObserver.prototype, "disconnect");
    const { unmount } = render(<Probe names={["--fors-accent"] as const} />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    disconnect.mockRestore();
  });

  it("handles an empty token list", () => {
    render(<Probe names={[] as const} />);
    expect(readProbe()).toEqual({});
  });

  it("follows a changed token list", () => {
    setTokens({ "--fors-accent": "#2dd4bf", "--fors-spark": "#f59e0b" });
    const { rerender } = render(<Probe names={["--fors-accent"] as const} />);
    expect(readProbe()).toEqual({ "--fors-accent": "#2dd4bf" });

    rerender(<Probe names={["--fors-spark"] as const} />);
    expect(readProbe()).toEqual({ "--fors-spark": "#f59e0b" });
  });

  it("survives a new array literal on every render", () => {
    setTokens({ "--fors-accent": "#2dd4bf" });
    const onRender = vi.fn();
    function Caller() {
      // A fresh literal each render — the common call shape in app code.
      const tokens = useForsTokens(["--fors-accent"] as const);
      onRender();
      return <output data-testid="tokens">{JSON.stringify(tokens)}</output>;
    }
    const { rerender } = render(<Caller />);
    rerender(<Caller />);
    expect(readProbe()["--fors-accent"]).toBe("#2dd4bf");
    expect(onRender).toHaveBeenCalledTimes(2);
  });

  it("renders on the server without a document", async () => {
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(React.createElement(Probe, { names: ["--fors-accent"] as const }));
    // Server-rendered markup is HTML-escaped; what matters is that the hook
    // produced the empty server snapshot instead of touching `document`.
    expect(html).toContain("--fors-accent&quot;:&quot;&quot;");
  });
});
