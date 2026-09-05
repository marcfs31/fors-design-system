import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

// Keyboard rather than click — see the note in DropdownMenu.test.tsx: Radix's
// click-open gesture depends on pointer-capture semantics jsdom doesn't implement.
describe("Popover", () => {
  it("opens on Enter and shows its content", async () => {
    render(
      <Popover>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent>Filter form</PopoverContent>
      </Popover>
    );
    screen.getByRole("button", { name: "Filter" }).focus();
    await userEvent.keyboard("{Enter}");
    expect(await screen.findByText("Filter form")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent aria-label="Filter options">Filter form</PopoverContent>
      </Popover>
    );
    const content = await screen.findByText("Filter form");
    expect(await axe(content.parentElement!)).toHaveNoViolations();
  });

  it("requires aria-label for dialog role", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent aria-label="Filter options">Filter form</PopoverContent>
      </Popover>
    );
    // Query for the dialog role element
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Filter options");
    expect(await axe(dialog)).toHaveNoViolations();
  });

  it("applies responsive max-width to PopoverContent", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent aria-label="Filter options">Filter form</PopoverContent>
      </Popover>
    );
    // Query for the dialog role element which is the PopoverContent
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("max-w-[calc(100vw-2rem)]");
  });
});
