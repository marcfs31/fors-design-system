import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as a <p> by default", () => {
    render(<Text>Deployed 3 minutes ago</Text>);
    const el = screen.getByText("Deployed 3 minutes ago");
    expect(el.tagName).toBe("P");
  });

  it("renders as the requested element", () => {
    render(<Text as="span">inline note</Text>);
    expect(screen.getByText("inline note").tagName).toBe("SPAN");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text>Deployed 3 minutes ago</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
