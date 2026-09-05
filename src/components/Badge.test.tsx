import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Shipped</Badge>);
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge variant="danger">Failed</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
