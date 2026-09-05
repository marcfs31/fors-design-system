import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Fors/Textarea",
  component: Textarea,
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Describe the issue you're seeing…" },
};

export const WithHint: Story = {
  args: { placeholder: "Project description", hint: "Shown on your public project page." },
};

export const Invalid: Story = {
  args: { placeholder: "Feedback", invalid: true, hint: "Feedback must be at least 20 characters." },
};
