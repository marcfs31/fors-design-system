import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Fors/Input",
  component: Input,
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "you@example.com", type: "email" },
};

export const WithHint: Story = {
  args: { placeholder: "Workspace name", hint: "Visible to everyone in your organization." },
};

export const Invalid: Story = {
  args: {
    placeholder: "you@example.com",
    value: "not-an-email",
    invalid: true,
    hint: "Enter a valid email address.",
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: { placeholder: "Locked field", disabled: true },
};
