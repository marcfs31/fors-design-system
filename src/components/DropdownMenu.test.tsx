import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./DropdownMenu";
import { Button } from "./Button";

// Keyboard rather than click: Radix's menu-open gesture depends on real
// pointer-capture semantics jsdom doesn't implement, which made click-driven
// interaction here flaky. Keyboard is the code path Radix documents as fully
// supported (WAI-ARIA menu button pattern) and is what jsdom can reliably simulate.
describe("DropdownMenu", () => {
  it("opens on Enter and fires onSelect", async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Rename</DropdownMenuItem>
          <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("menuitem", { name: "Rename" });
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations when open", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("menuitem", { name: "Rename" });
    expect(await axe(screen.getByRole("menu"))).toHaveNoViolations();
  });

  it("applies responsive max-width to DropdownMenuContent", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveClass("max-w-[calc(100vw-2rem)]");
  });
});
