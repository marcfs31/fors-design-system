import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Fors/Progress",
  component: Progress,
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Empty: Story = {
  args: { value: 0 },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};
export const Halfway: Story = {
  args: { value: 50 },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};
export const NearlyDone: Story = {
  args: { value: 92 },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};
