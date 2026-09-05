import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";
import { Button } from "./Button";

const meta: Meta = {
  title: "Fors/Dialog",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Confirmation: Story = {
  render: () => (
    <div className="flex h-96 items-center justify-center">
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button variant="danger">Delete project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this project?</DialogTitle>
            <DialogDescription>
              This permanently removes the project, its deployments, and its environment variables.
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="danger">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <div className="flex h-96 items-center justify-center">
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>New project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a project</DialogTitle>
            <DialogDescription>Name it something your team will recognize.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
