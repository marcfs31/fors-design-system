import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Alert } from "./Alert";
import { Button } from "./Button";

const meta: Meta<typeof Alert> = {
  title: "Fors/Feedback/Alert",
  component: Alert,
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Neutral: Story = {
  args: {
    variant: "neutral",
    title: "Heads up",
    children: "Deploys are paused during the migration window.",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    title: "New feature",
    children: "Custom domains are now available on the Rapids plan.",
  },
};

export const Success: Story = {
  args: { variant: "success", title: "Deployed", children: "Your changes are live in production." },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Approaching limit",
    children: "You've used 92% of this month's build minutes.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Deploy failed",
    children: "Build exited with code 1 — check the deploy log for details.",
  },
};

function DismissibleExample() {
  const [visible, setVisible] = React.useState(true);
  return visible ? (
    <Alert variant="danger" title="Import failed" onDismiss={() => setVisible(false)}>
      The file could not be parsed as CSV.
    </Alert>
  ) : (
    <Button variant="secondary" onClick={() => setVisible(true)}>
      Show the alert again
    </Button>
  );
}

export const Dismissible: Story = {
  render: () => <DismissibleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    // The consumer owns visibility: the alert is gone because state said so.
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Show the alert again" })).toBeInTheDocument();
  },
};

export const DismissibleLongBody: Story = {
  name: "Dismissible (long body)",
  args: {
    variant: "warning",
    title: "Partial import",
    onDismiss: () => {},
    children:
      "37 of 40 rows were created. Rows 12, 18 and 31 were skipped because their SKU already exists in the catalogue, and re-importing them would have created duplicates.",
  },
};
