import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "./Button";
import { Input } from "./Input";

const meta: Meta = {
  title: "Fors/Popover",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const FilterForm: Story = {
  render: () => (
    <div className="flex h-64 items-start justify-center pt-12">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="secondary">Filter</Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Filter options">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1 font-sans text-sm font-medium text-fg">Branch</p>
              <Input placeholder="main" />
            </div>
            <Button size="sm">Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
