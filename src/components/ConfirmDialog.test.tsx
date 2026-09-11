import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog } from "./ConfirmDialog";

// Open-state axe runs in real Chromium via the Storybook test runner
// (`Fors/Overlays/ConfirmDialog`); see Dialog.test.tsx for why not here.

const baseProps = {
  title: "Delete this product?",
  description: "It moves to the trash and can be restored for 30 days.",
  confirmLabel: "Delete",
  cancelLabel: "Keep",
};

describe("ConfirmDialog", () => {
  it("renders nothing while closed", () => {
    render(<ConfirmDialog {...baseProps} open={false} onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("opens as an alertdialog named by its title and described by its description", () => {
    render(<ConfirmDialog {...baseProps} open onConfirm={() => {}} onCancel={() => {}} />);
    const dialog = screen.getByRole("alertdialog", { name: "Delete this product?" });
    expect(dialog).toHaveAccessibleDescription(baseProps.description);
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("fires onConfirm / onCancel from their buttons", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<ConfirmDialog {...baseProps} open onConfirm={onConfirm} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole("button", { name: "Keep" }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("treats Escape as cancel", async () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...baseProps} open onConfirm={() => {}} onCancel={onCancel} />);
    await userEvent.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("focuses the confirm action by default and Cancel when destructive", () => {
    const { unmount } = render(
      <ConfirmDialog {...baseProps} open onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveFocus();
    unmount();
    render(
      <ConfirmDialog {...baseProps} open destructive onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByRole("button", { name: "Keep" })).toHaveFocus();
  });

  it("uses the danger variant for a destructive confirm", () => {
    render(
      <ConfirmDialog {...baseProps} open destructive onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("bg-danger");
  });

  it("disables both actions and ignores dismissal while loading", async () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...baseProps} open loading onConfirm={() => {}} onCancel={onCancel} />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Keep" })).toBeDisabled();
    await userEvent.keyboard("{Escape}");
    expect(onCancel).not.toHaveBeenCalled();
  });
});
