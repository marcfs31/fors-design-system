import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./DropdownMenu";
import { Button } from "./Button";

const meta: Meta = {
  title: "Fors/DropdownMenu",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const ProjectActions: Story = {
  // Shown open for visual review. Radix correctly sets `aria-hidden` on the
  // rest of the page (incl. #storybook-root) while a menu is open, which
  // axe's `aria-hidden-focus` rule flags as a static-snapshot false positive
  // against that focus-trap pattern — open-menu a11y is covered in
  // DropdownMenu.test.tsx instead.
  parameters: { a11y: { options: { rules: { "aria-hidden-focus": { enabled: false } } } } },
  render: () => (
    <div className="flex h-64 items-start justify-center pt-12">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" aria-label="Project actions">
            ⋯
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Transfer ownership</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger">Delete project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
