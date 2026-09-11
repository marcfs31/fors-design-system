import * as React from "react";
import { cn } from "../lib/cn";
import { Pagination, PaginationEllipsis, PaginationItem } from "./Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

export type PageRangeItem = number | "ellipsis";

/**
 * Which page numbers to show for `page` (1-based) of `pageCount`, with
 * `siblingCount` neighbours on each side of the current page and the first
 * and last page always present. Gaps are `"ellipsis"`. The strip never grows
 * beyond `2 * siblingCount + 5` items, so it fits a phone at 320px.
 *
 * Contract (siblingCount = 1):
 *   pageCount ≤ 7     → every page, no ellipsis
 *   page 1 of 10      → [1, 2, 3, 4, 5, "ellipsis", 10]
 *   page 5 of 10      → [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 *   page 9 of 10      → [1, "ellipsis", 6, 7, 8, 9, 10]
 */
export function pageRange(page: number, pageCount: number, siblingCount = 1): PageRangeItem[] {
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const total = 2 * siblingCount + 5;
  if (pageCount <= total) return range(1, pageCount);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);
  // An ellipsis only earns its slot when it hides at least one page;
  // otherwise that slot goes to a real page number so the strip keeps a
  // constant width and nothing jumps as the user pages through.
  const gapOnLeft = leftSibling > 2;
  const gapOnRight = rightSibling < pageCount - 1;
  const solidRun = total - 2;

  if (!gapOnLeft && gapOnRight) return [...range(1, solidRun), "ellipsis", pageCount];
  if (gapOnLeft && !gapOnRight) {
    return [1, "ellipsis", ...range(pageCount - solidRun + 1, pageCount)];
  }
  return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", pageCount];
}

export interface TablePaginationLabels {
  /** Visible label for the rows-per-page selector. */
  rowsPerPage: string;
  /** Range summary, e.g. "1–25 of 132". `from` is 0 when there are no rows. */
  displayedRows: (range: { from: number; to: number; count: number }) => string;
  /** Accessible name of the whole control (the `<nav>`). */
  pagination: string;
  previousPage: string;
  nextPage: string;
  /** Accessible name of a page button, e.g. "Page 3". */
  page: (page: number) => string;
}

const DEFAULT_LABELS: TablePaginationLabels = {
  rowsPerPage: "Rows per page",
  displayedRows: ({ from, to, count }) => `${from}–${to} of ${count}`,
  pagination: "Table pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  page: (page) => `Page ${page}`,
};

export interface TablePaginationProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Total number of rows across all pages. */
  count: number;
  /** Current page, 1-based. */
  page: number;
  rowsPerPage: number;
  /** Omit `onRowsPerPageChange` to hide the selector. */
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  /** Page buttons shown on each side of the current page. */
  siblingCount?: number;
  /** Override any of the English defaults — pass all of them for a localized app. */
  labels?: Partial<TablePaginationLabels>;
}

const CHEVRON = (direction: "start" | "end") => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={cn(direction === "start" ? "rtl:rotate-180" : "ltr:rotate-180 rtl:rotate-0")}
  >
    <path
      d="M7.5 3L4.5 6L7.5 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The footer of a paginated data table: a rows-per-page `Select`, the
 * "from–to of count" summary (a polite live region, so a screen reader hears
 * the new range after a page change), and a `Pagination` strip with
 * previous/next and a windowed set of page numbers (`pageRange`). Pages are
 * 1-based. Changing the page size resets to page 1 — the caller receives
 * `onRowsPerPageChange` and then `onPageChange(1)`, in that order.
 */
export const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      count,
      page,
      rowsPerPage,
      rowsPerPageOptions = [10, 25, 50, 100],
      onPageChange,
      onRowsPerPageChange,
      siblingCount = 1,
      labels: labelOverrides,
      className,
      ...props
    },
    ref
  ) => {
    const labels = { ...DEFAULT_LABELS, ...labelOverrides };
    const rowsPerPageId = React.useId();
    const pageCount = Math.max(1, Math.ceil(count / rowsPerPage));
    const from = count === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to = Math.min(count, page * rowsPerPage);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 font-sans text-sm text-fg-secondary",
          className
        )}
        {...props}
      >
        {onRowsPerPageChange ? (
          <div className="flex items-center gap-2">
            <span id={rowsPerPageId}>{labels.rowsPerPage}</span>
            <Select
              value={String(rowsPerPage)}
              onValueChange={(value) => {
                onRowsPerPageChange(Number(value));
                onPageChange(1);
              }}
            >
              <SelectTrigger aria-labelledby={rowsPerPageId} className="h-9 w-auto min-w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rowsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <span />
        )}
        <span aria-live="polite" className="tabular-nums">
          {labels.displayedRows({ from, to, count })}
        </span>
        <Pagination aria-label={labels.pagination}>
          <PaginationItem
            aria-label={labels.previousPage}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            {CHEVRON("start")}
          </PaginationItem>
          {pageRange(page, pageCount, siblingCount).map((item, index) =>
            item === "ellipsis" ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem
                key={item}
                active={item === page}
                aria-label={labels.page(item)}
                onClick={() => onPageChange(item)}
              >
                {item}
              </PaginationItem>
            )
          )}
          <PaginationItem
            aria-label={labels.nextPage}
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            {CHEVRON("end")}
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
);
TablePagination.displayName = "TablePagination";
