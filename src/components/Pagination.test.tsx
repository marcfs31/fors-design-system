import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { Pagination, PaginationItem, PaginationEllipsis } from "./Pagination";

describe("Pagination", () => {
  it("marks the active page and fires clicks on others", async () => {
    const onClick = vi.fn();
    render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
        <PaginationItem onClick={onClick}>2</PaginationItem>
      </Pagination>
    );
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Pagination>
        <PaginationItem active>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
      </Pagination>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders an ellipsis hidden from assistive tech", () => {
    const { container } = render(<PaginationEllipsis />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("…")).toBeInTheDocument();
  });
});
