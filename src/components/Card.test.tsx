import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card";

describe("Card", () => {
  it("renders composed content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Rapids plan</CardTitle>
          <CardDescription>For growing teams</CardDescription>
        </CardHeader>
        <CardContent>Unlimited projects</CardContent>
      </Card>
    );
    expect(screen.getByText("Rapids plan")).toBeInTheDocument();
    expect(screen.getByText("For growing teams")).toBeInTheDocument();
    expect(screen.getByText("Unlimited projects")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Rapids plan</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
