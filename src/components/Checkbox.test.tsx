import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles checked state on click", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Agree to terms" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole("checkbox", { name: "Agree to terms" });
    expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox aria-label="Agree to terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
