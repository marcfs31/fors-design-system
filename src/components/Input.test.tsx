import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Input } from "./Input";

describe("Input", () => {
  it("accepts typed text", async () => {
    render(<Input placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    await userEvent.type(input, "marc@fors.dev");
    expect(input).toHaveValue("marc@fors.dev");
  });

  it("marks itself invalid and shows the hint", () => {
    render(<Input placeholder="Email" invalid hint="Enter a valid email." readOnly />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter a valid email.")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input placeholder="Email" aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
