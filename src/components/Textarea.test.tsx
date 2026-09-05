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
    render(
      <Textarea placeholder="Feedback" invalid hint="Must be at least 20 characters." readOnly />
    );
    expect(screen.getByPlaceholderText("Feedback")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Must be at least 20 characters.")).toBeInTheDocument();
  });

  it("links hint text to textarea via aria-describedby", () => {
    render(<Textarea placeholder="Feedback" hint="Provide detailed feedback." />);
    const textarea = screen.getByPlaceholderText("Feedback");
    const hintText = screen.getByText("Provide detailed feedback.");
    const hintId = hintText.id;
    expect(hintId).toBeTruthy();
    expect(textarea).toHaveAttribute("aria-describedby", hintId);
  });

  it("does not set aria-describedby when hint is absent", () => {
    render(<Textarea placeholder="Feedback" />);
    expect(screen.getByPlaceholderText("Feedback")).not.toHaveAttribute("aria-describedby");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea placeholder="Notes" aria-label="Notes" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
