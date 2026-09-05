import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Label } from "./Label";
import { Input } from "./Input";

describe("Label", () => {
  it("associates with its control via htmlFor and gives it an accessible name", () => {
    render(
      <>
        <Label htmlFor="workspace">Workspace name</Label>
        <Input id="workspace" />
      </>
    );
    expect(screen.getByRole("textbox", { name: "Workspace name" })).toBeInTheDocument();
  });

  it("clicking the label focuses the associated control", async () => {
    render(
      <>
        <Label htmlFor="workspace">Workspace name</Label>
        <Input id="workspace" />
      </>
    );
    await userEvent.click(screen.getByText("Workspace name"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Label htmlFor="workspace">Workspace name</Label>
        <Input id="workspace" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
