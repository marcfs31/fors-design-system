import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { axe } from "../test-utils/axe";
import * as Icons from "./index";
import { IconPlus, type ForsIcon } from "./index";

const ALL_ICONS = Object.entries(Icons).filter((entry): entry is [string, ForsIcon] =>
  entry[0].startsWith("Icon")
);

describe("icons", () => {
  it("exports a non-empty, consistently named set", () => {
    expect(ALL_ICONS.length).toBeGreaterThan(20);
    for (const [name, Icon] of ALL_ICONS) {
      expect(Icon.displayName).toBe(name);
    }
  });

  it.each(ALL_ICONS)("%s renders a decorative 20px svg by default", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
    expect(svg).toHaveAttribute("stroke-width", "1.75");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("accepts size, strokeWidth and className overrides", () => {
    const { container } = render(<IconPlus size={16} strokeWidth={2} className="text-danger" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("stroke-width", "2");
    expect(svg).toHaveClass("text-danger");
  });

  it("can be made meaningful with role=img and a label", () => {
    render(<IconPlus aria-hidden={false} role="img" aria-label="Add" />);
    expect(screen.getByRole("img", { name: "Add" })).toBeInTheDocument();
  });

  it("forwards refs to the svg element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<IconPlus ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe("svg");
  });

  it("has no accessibility violations, decorative or meaningful", async () => {
    const { container } = render(
      <>
        <button type="button" aria-label="Delete">
          <Icons.IconTrash />
        </button>
        <Icons.IconUserCheck aria-hidden={false} role="img" aria-label="Checked in" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
