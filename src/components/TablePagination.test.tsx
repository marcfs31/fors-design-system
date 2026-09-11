import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../test-utils/axe";
import { TablePagination, pageRange } from "./TablePagination";

describe("pageRange", () => {
  it("lists every page when they all fit", () => {
    expect(pageRange(1, 1)).toEqual([1]);
    expect(pageRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("collapses the far end near the start", () => {
    expect(pageRange(1, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    expect(pageRange(3, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
  });

  it("collapses both ends around a middle page", () => {
    expect(pageRange(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("collapses the near end towards the last page", () => {
    expect(pageRange(9, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
    expect(pageRange(10, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("widens the window with siblingCount and never exceeds 2 * siblings + 5 items", () => {
    expect(pageRange(10, 20, 2)).toEqual([1, "ellipsis", 8, 9, 10, 11, 12, "ellipsis", 20]);
    for (let page = 1; page <= 50; page++) {
      expect(pageRange(page, 50, 2).length).toBeLessThanOrEqual(9);
      expect(pageRange(page, 50, 2)).toContain(page);
    }
  });
});

describe("TablePagination", () => {
  const renderIt = (props: Partial<React.ComponentProps<typeof TablePagination>> = {}) => {
    const onPageChange = vi.fn();
    const onRowsPerPageChange = vi.fn();
    const utils = render(
      <TablePagination
        count={132}
        page={3}
        rowsPerPage={25}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        {...props}
      />
    );
    return { ...utils, onPageChange, onRowsPerPageChange };
  };

  it("summarizes the visible range and marks the current page", () => {
    renderIt();
    expect(screen.getByText("51–75 of 132")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
  });

  it("navigates with the page, previous and next buttons", async () => {
    const { onPageChange } = renderIt();
    const nav = within(screen.getByRole("navigation", { name: "Table pagination" }));
    await userEvent.click(nav.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    await userEvent.click(nav.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    await userEvent.click(nav.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
  });

  it("disables previous on the first page and next on the last", () => {
    renderIt({ page: 1, count: 30, rowsPerPage: 25 });
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });

  it("shows 0–0 for an empty table and keeps a single disabled page", () => {
    renderIt({ count: 0, page: 1 });
    expect(screen.getByText("0–0 of 0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("hides the rows-per-page selector when there is no handler", () => {
    render(<TablePagination count={10} page={1} rowsPerPage={10} onPageChange={() => {}} />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("names the rows-per-page selector by its visible label", () => {
    renderIt();
    expect(screen.getByRole("combobox", { name: "Rows per page" })).toHaveTextContent("25");
  });

  it("changes the page size by keyboard and resets to page 1", async () => {
    const { onPageChange, onRowsPerPageChange } = renderIt();
    const trigger = screen.getByRole("combobox", { name: "Rows per page" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onRowsPerPageChange).toHaveBeenCalledWith(50);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("accepts localized labels", () => {
    renderIt({
      labels: {
        rowsPerPage: "Filas por página",
        displayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
        pagination: "Paginación",
        page: (n) => `Página ${n}`,
      },
    });
    expect(screen.getByText("51–75 de 132")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Paginación" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 3" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderIt();
    expect(await axe(container)).toHaveNoViolations();
  });
});
