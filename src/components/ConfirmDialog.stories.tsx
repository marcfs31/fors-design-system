import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";
import { Button } from "./Button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Fors/Overlays/ConfirmDialog",
  component: ConfirmDialog,
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function Example(props: Partial<ConfirmDialogProps> & { trigger: string }) {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button variant={props.destructive ? "danger" : "primary"} onClick={() => setOpen(true)}>
        {props.trigger}
      </Button>
      {result && <p className="font-sans text-sm text-fg-secondary">Result: {result}</p>}
      <ConfirmDialog
        open={open}
        title="Delete this product?"
        description="It moves to the trash and can be restored for 30 days."
        confirmLabel="Delete"
        cancelLabel="Keep"
        onConfirm={() => {
          setResult("confirmed");
          setOpen(false);
        }}
        onCancel={() => {
          setResult("cancelled");
          setOpen(false);
        }}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Example trigger="Archive product" destructive={false} />,
};

export const Destructive: Story = {
  render: () => <Example trigger="Delete product" destructive />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Delete product" }));
    const dialog = await within(document.body).findByRole("alertdialog", {
      name: "Delete this product?",
    });
    // Destructive: focus starts on the safe action.
    await expect(within(dialog).getByRole("button", { name: "Keep" })).toHaveFocus();
    await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));
    await expect(canvas.getByText("Result: confirmed")).toBeInTheDocument();
  },
};

export const Loading: Story = {
  render: () => (
    <ConfirmDialog
      open
      loading
      title="Deleting product…"
      description="Hang on while the product moves to the trash."
      confirmLabel="Delete"
      cancelLabel="Keep"
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  ),
};
