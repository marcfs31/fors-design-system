import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TablePagination } from "./TablePagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";

const meta: Meta<typeof TablePagination> = {
  title: "Fors/Data Display/TablePagination",
  component: TablePagination,
};
export default meta;
type Story = StoryObj<typeof TablePagination>;

const ROWS = Array.from({ length: 132 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: ((i * 7) % 90) + 10,
}));

function Example({ withSelector = true }: { withSelector?: boolean }) {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const visible = ROWS.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-end">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-end">${row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={ROWS.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={withSelector ? setRowsPerPage : undefined}
      />
    </div>
  );
}

export const WithTable: Story = {
  render: () => <Example />,
};

export const PagesOnly: Story = {
  render: () => <Example withSelector={false} />,
};

export const Localized: Story = {
  render: () => (
    <TablePagination
      count={132}
      page={5}
      rowsPerPage={10}
      onPageChange={() => {}}
      onRowsPerPageChange={() => {}}
      labels={{
        rowsPerPage: "Filas por página",
        displayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
        pagination: "Paginación de la tabla",
        previousPage: "Página anterior",
        nextPage: "Página siguiente",
        page: (n) => `Página ${n}`,
      }}
    />
  ),
};

export const Empty: Story = {
  args: {
    count: 0,
    page: 1,
    rowsPerPage: 25,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
  },
};
