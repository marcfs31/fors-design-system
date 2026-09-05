import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "../test-utils/axe";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./Table";

function ExampleTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>fors-client-portal</TableCell>
          <TableCell>success</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("renders header and row content", () => {
    render(<ExampleTable />);
    expect(screen.getByRole("columnheader", { name: "Project" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "fors-client-portal" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExampleTable />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
