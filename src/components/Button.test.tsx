import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole("button", { name: "Deploy" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Deploy</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Deploy" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Deploy
      </Button>
    );
    await userEvent.click(screen.getByRole("button", { name: "Deploy" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Deploy</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders onto its child with asChild, keeping the styles and the slot attribute", () => {
    render(
      <Button asChild variant="secondary">
        <a href="/products/new">New product</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "New product" });
    expect(link).toHaveAttribute("href", "/products/new");
    expect(link).toHaveAttribute("data-fors", "button");
    expect(link).toHaveClass("bg-ink-surface-2");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("carries the data-fors slot attribute for consumer skins", () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole("button", { name: "Deploy" })).toHaveAttribute("data-fors", "button");
  });

  it("disables itself and marks aria-busy while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Deploy
      </Button>
    );
    const button = screen.getByRole("button", { name: "Deploy" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
