import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the requested semantic level", () => {
    render(<Heading as="h1">Build faster</Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "Build faster" })).toBeInTheDocument();
  });

  it("defaults to h2", () => {
    render(<Heading>Recent deployments</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Heading as="h1">Build faster</Heading>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
