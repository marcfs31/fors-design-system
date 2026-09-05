import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Button } from "./Button";

function ExampleTooltip() {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="ghost">Redeploy</Button>
        </TooltipTrigger>
        <TooltipContent>Rebuilds from the last successful commit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("renders its content when open", () => {
    render(<ExampleTooltip />);
    expect(screen.getByText("Rebuilds from the last successful commit")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExampleTooltip />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
