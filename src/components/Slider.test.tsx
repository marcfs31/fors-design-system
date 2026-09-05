import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a thumb per value", () => {
    render(<Slider defaultValue={[20, 80]} max={100} aria-label="Range" />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("exposes the current value via ARIA", () => {
    render(<Slider defaultValue={[40]} max={100} aria-label="Volume" />);
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute("aria-valuenow", "40");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Slider defaultValue={[40]} max={100} aria-label="Volume" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
