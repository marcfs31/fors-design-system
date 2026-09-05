import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Tabs } from "./Tabs";

function ExampleTabs() {
  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview">Overview content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings content</Tabs.Panel>
    </Tabs.Root>
  );
}

describe("Tabs", () => {
  it("shows only the active panel", () => {
    render(<ExampleTabs />);
    expect(screen.getByText("Overview content")).toBeInTheDocument();
    expect(screen.queryByText("Settings content")).not.toBeInTheDocument();
  });

  it("switches panels when a trigger is clicked", async () => {
    render(<ExampleTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Settings" }));
    expect(screen.getByText("Settings content")).toBeInTheDocument();
    expect(screen.queryByText("Overview content")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExampleTabs />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
