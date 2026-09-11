import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "./index";
import { Button } from "../components/Button";
import { IconPlus, IconTrash } from "./index";

const ALL_ICONS = Object.entries(Icons).filter((entry): entry is [string, Icons.ForsIcon] =>
  entry[0].startsWith("Icon")
);

const meta: Meta = {
  title: "Fors/Foundations/Icons",
  parameters: {
    docs: {
      description: {
        component:
          'Curated, Fors-named icon set exported from `@marcfs31/fors-design-system/icons`. Icons are named by what they mean in a Fors app (`IconTrash`, `IconReceipt`), default to 20px / 1.75 stroke, inherit `currentColor`, and are decorative (`aria-hidden`) unless you pass `aria-hidden={false}` with `role="img"` and an `aria-label`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  render: () => (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {ALL_ICONS.map(([name, Icon]) => (
        <li
          key={name}
          className="flex flex-col items-center gap-2 rounded-md border border-ink-border bg-ink-surface p-3 text-fg-secondary"
        >
          <Icon size={24} />
          <code className="font-mono text-xs">{name}</code>
        </li>
      ))}
    </ul>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 text-fg">
      <IconPlus size={16} />
      <IconPlus />
      <IconPlus size={24} />
      <IconPlus size={32} strokeWidth={1.5} />
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button leadingIcon={<IconPlus />}>New product</Button>
      <Button variant="danger" leadingIcon={<IconTrash />}>
        Delete
      </Button>
      <Button variant="ghost" size="sm" aria-label="Delete">
        <IconTrash size={16} />
      </Button>
    </div>
  ),
};

export const Meaningful: Story = {
  name: "Meaningful (not decorative)",
  render: () => (
    <p className="flex items-center gap-2 text-fg">
      <Icons.IconUserCheck
        aria-hidden={false}
        role="img"
        aria-label="Checked in"
        className="text-success"
      />
      Ana Lopez
    </p>
  ),
};
