import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes its value via ARIA", () => {
    render(<Progress value={42} aria-label="Upload progress" />);
    const bar = screen.getByRole("progressbar", { name: "Upload progress" });
    expect(bar).toHaveAttribute("aria-valuenow", "42");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={42} aria-label="Upload progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
