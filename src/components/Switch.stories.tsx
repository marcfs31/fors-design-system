import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Fors/Switch",
  component: Switch,
  // Radix Switch renders a <button role="switch"> with no text — it always
  // needs an accessible name: an `aria-label`, or a `<label htmlFor>` bound
  // to its `id` (see the WithLabel story).
  args: { "aria-label": "Preview deployments" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = { args: {} };
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="marketing" defaultChecked />
      <label htmlFor="marketing" className="font-sans text-sm text-fg">
        Send me product updates
      </label>
    </div>
  ),
};
