import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show more</CollapsibleTrigger>
      <CollapsibleContent>Extra detail</CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("is closed by default", () => {
    render(<Example />);
    expect(screen.queryByText("Extra detail")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("shows its content on trigger click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(screen.getByText("Extra detail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
