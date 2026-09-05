import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("exposes an accessible label", () => {
    render(<Spinner label="Loading deployments" />);
    expect(screen.getByRole("status", { name: "Loading deployments" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
