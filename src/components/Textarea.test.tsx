import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("accepts multi-line text", async () => {
    render(<Textarea placeholder="Notes" />);
    const textarea = screen.getByPlaceholderText("Notes");
    await userEvent.type(textarea, "line one{enter}line two");
    expect(textarea).toHaveValue("line one\nline two");
  });

  it("marks itself invalid and shows the hint", () => {
    render(<Textarea placeholder="Feedback" invalid hint="Must be at least 20 characters." readOnly />);
    expect(screen.getByPlaceholderText("Feedback")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Must be at least 20 characters.")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea placeholder="Notes" aria-label="Notes" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
