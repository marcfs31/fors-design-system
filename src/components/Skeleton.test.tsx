import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
