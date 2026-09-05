import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog";
import { Button } from "./Button";

function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>This cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed until the trigger is activated", () => {
    render(<ExampleDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click and shows its title", async () => {
    render(<ExampleDialog />);
    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Delete this project?")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    render(<ExampleDialog />);
    await userEvent.click(screen.getByRole("button", { name: "Delete project" }));
    expect(await axe(screen.getByRole("dialog"))).toHaveNoViolations();
  });
});
