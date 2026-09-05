import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta = {
  title: "Fors/Tabs",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview" className="w-96">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview">Project health, deploy status, and recent commits.</Tabs.Panel>
      <Tabs.Panel value="activity">A chronological feed of team activity on this project.</Tabs.Panel>
      <Tabs.Panel value="settings">Environment variables, domains, and integrations.</Tabs.Panel>
    </Tabs.Root>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs.Root defaultValue="monthly" className="w-72">
      <Tabs.List>
        <Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
        <Tabs.Trigger value="yearly">Yearly (save 20%)</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="monthly">$29/month, billed monthly.</Tabs.Panel>
      <Tabs.Panel value="yearly">$279/year, billed annually.</Tabs.Panel>
    </Tabs.Root>
  ),
};
