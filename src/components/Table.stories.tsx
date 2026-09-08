import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./Table";
import { Badge } from "./Badge";

const meta: Meta = {
  title: "Fors/Data Display/Table",
};
export default meta;
type Story = StoryObj;

const deployments = [
  { project: "fors-client-portal", branch: "main", status: "success", when: "2m ago" },
  { project: "habit-tracker", branch: "feature/calendar", status: "building", when: "8m ago" },
  { project: "internal-crm", branch: "main", status: "failed", when: "1h ago" },
];

export const Deployments: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deployed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((d) => (
          <TableRow key={d.project}>
            <TableCell>{d.project}</TableCell>
            <TableCell className="text-fg-secondary">{d.branch}</TableCell>
            <TableCell>
              <Badge
                variant={
                  d.status === "success" ? "success" : d.status === "failed" ? "danger" : "warning"
                }
              >
                {d.status}
              </Badge>
            </TableCell>
            <TableCell className="text-fg-muted">{d.when}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
