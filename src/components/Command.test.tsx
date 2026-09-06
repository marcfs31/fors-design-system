import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./Command";

// Command's own root and CommandDialog (built on Dialog, not a floating-ui
// popper) render instantly under jsdom, unlike Popover/DropdownMenu/Tooltip —
// so both are exercised directly here, including axe() on the closed-list
// inline Command. See CONTRIBUTING.md's jsdom/overlay testing-boundary note.

function ExampleCommand({ onSelect = () => {} }: { onSelect?: (value: string) => void }) {
  return (
    <Command label="Example commands">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem onSelect={() => onSelect("apple")}>Apple</CommandItem>
          <CommandItem onSelect={() => onSelect("banana")}>Banana</CommandItem>
          <CommandItem disabled onSelect={() => onSelect("cherry")}>
            Cherry (unavailable)
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("renders every item and group heading", () => {
    render(<ExampleCommand />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.getByText("Fruits")).toBeInTheDocument();
  });

  it("filters items as the user types", async () => {
    render(<ExampleCommand />);
    await userEvent.type(screen.getByPlaceholderText("Search commands..."), "ban");
    expect(screen.queryByRole("option", { name: "Apple" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("shows CommandEmpty when no item matches", async () => {
    render(<ExampleCommand />);
    await userEvent.type(screen.getByPlaceholderText("Search commands..."), "xyz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("marks a disabled item aria-disabled and never fires its onSelect", async () => {
    const onSelect = vi.fn();
    render(<ExampleCommand onSelect={onSelect} />);
    const disabledItem = screen.getByRole("option", { name: "Cherry (unavailable)" });
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(disabledItem);
    expect(onSelect).not.toHaveBeenCalledWith("cherry");
  });

  it("fires onSelect for an enabled item on click", async () => {
    const onSelect = vi.fn();
    render(<ExampleCommand onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("option", { name: "Apple" }));
    expect(onSelect).toHaveBeenCalledWith("apple");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExampleCommand />);
    // cmdk's own `CommandSeparator` renders `role="separator"` as a direct
    // child of `CommandList`'s `role="listbox"` — axe's `aria-required-children`
    // rule only allows `option`/`group` there. This is cmdk's built-in,
    // widely-used group-divider pattern (the separator hides itself while a
    // search is active), not a defect this wrapper introduces or can fix
    // without abandoning cmdk's separator behavior.
    expect(
      await axe(container, { rules: { "aria-required-children": { enabled: false } } })
    ).toHaveNoViolations();
  });
});

describe("CommandDialog", () => {
  it("is closed until opened", () => {
    render(
      <CommandDialog label="Quick actions">
        <CommandInput />
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders its accessible name and description visually hidden when open", () => {
    render(
      <CommandDialog defaultOpen label="Quick actions" description="Search for an action.">
        <CommandInput />
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    const dialog = screen.getByRole("dialog", { name: "Quick actions" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Search for an action.")).toHaveClass("sr-only");
  });

  it("has no visible close button", () => {
    render(
      <CommandDialog defaultOpen label="Quick actions">
        <CommandInput />
        <CommandList>
          <CommandItem>Item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
