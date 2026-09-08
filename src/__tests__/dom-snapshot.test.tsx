import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Heading,
  Input,
  Label,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarProvider,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Text,
  Textarea,
} from "../index";

/**
 * Structural-regression tripwire. Each case renders one component in a
 * canonical state and snapshots its serialized DOM. A refactor that
 * unintentionally drops a class (`focus-visible:shadow-focus-ring`, a
 * token color), changes an element or an ARIA attribute, or reorders the
 * markup shows up here as a diff to review.
 *
 * When a change IS intentional, re-generate with `npx vitest run -u`
 * and eyeball the snapshot diff in the PR.
 *
 * Portal-only overlays (Dialog / DropdownMenu / Popover / Tooltip / Select
 * / Toast content) are exercised open, by keyboard, in their own
 * `*.test.tsx` and in the Storybook test runner — snapshotting a closed
 * trigger here would add churn without coverage.
 */
const cases: Record<string, React.ReactElement> = {
  "Button/primary": <Button>Deploy</Button>,
  "Button/all-variants": (
    <div>
      {(["primary", "secondary", "spark", "ghost", "danger"] as const).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
  "Button/loading": <Button loading>Deploying</Button>,
  "Badge/all-variants": (
    <div>
      {(["neutral", "accent", "spark", "success", "warning", "danger"] as const).map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
  "Input/with-hint-invalid": (
    <Input hint="That email is taken." invalid defaultValue="x" readOnly />
  ),
  "Textarea/with-hint": <Textarea hint="Markdown supported." readOnly />,
  "Checkbox/checked": <Checkbox defaultChecked aria-label="Agree" />,
  "Switch/on": <Switch defaultChecked aria-label="Previews" />,
  "RadioGroup/two-options": (
    <RadioGroup defaultValue="a" aria-label="Plan">
      <RadioGroupItem value="a" aria-label="A" />
      <RadioGroupItem value="b" aria-label="B" />
    </RadioGroup>
  ),
  "Slider/single": <Slider defaultValue={[40]} max={100} aria-label="Limit" />,
  "Alert/danger": (
    <Alert variant="danger" title="Build failed">
      Type error in api.ts
    </Alert>
  ),
  "Progress/68": <Progress value={68} aria-label="Upload" />,
  "Spinner/md": <Spinner label="Loading" />,
  "Skeleton/line": <Skeleton className="h-4 w-32" />,
  "Avatar/initials": <Avatar initials="MF" alt="Marc Fors" />,
  "AvatarGroup/overflow": (
    <AvatarGroup max={2}>
      <Avatar initials="MF" alt="Marc Fors" />
      <Avatar initials="JD" alt="Jamie Doe" />
      <Avatar initials="AK" alt="Alex Kim" />
    </AvatarGroup>
  ),
  "Heading/h2": (
    <Heading as="h2" size="lg">
      Deployments
    </Heading>
  ),
  "Text/secondary": <Text tone="secondary">Supporting copy</Text>,
  "Card/full": (
    <Card>
      <CardHeader>
        <CardTitle>Plan</CardTitle>
      </CardHeader>
      <CardContent>Body</CardContent>
      <CardFooter>
        <Button size="sm">Go</Button>
      </CardFooter>
    </Card>
  ),
  "Tabs/default": (
    <Tabs.Root defaultValue="a">
      <Tabs.List>
        <Tabs.Trigger value="a">A</Tabs.Trigger>
        <Tabs.Trigger value="b">B</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">Panel A</Tabs.Panel>
    </Tabs.Root>
  ),
  "Accordion/one-open": (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>Q</AccordionTrigger>
        <AccordionContent>A</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  "Breadcrumb/trail": (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Now</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  "Pagination/strip": (
    <Pagination>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>9</PaginationItem>
    </Pagination>
  ),
  "Table/rows": (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Branch</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>main</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  "Separator/horizontal": <Separator />,
  "Separator/vertical": <Separator orientation="vertical" />,
  "Label/basic": <Label htmlFor="x">Workspace name</Label>,
  "Collapsible/closed": (
    <Collapsible>
      <CollapsibleTrigger>Show more</CollapsibleTrigger>
      <CollapsibleContent>Extra detail</CollapsibleContent>
    </Collapsible>
  ),
  "Sidebar/expanded": (
    <SidebarProvider>
      <Sidebar label="Main navigation">
        <SidebarHeader>Fors Corp</SidebarHeader>
        <SidebarNav>
          <SidebarNavItem href="#a" active>
            Overview
          </SidebarNavItem>
        </SidebarNav>
      </Sidebar>
    </SidebarProvider>
  ),
  "Sidebar/collapsed": (
    <SidebarProvider defaultCollapsed>
      <Sidebar label="Main navigation">
        <SidebarNav>
          <SidebarNavItem href="#a">Overview</SidebarNavItem>
        </SidebarNav>
      </Sidebar>
    </SidebarProvider>
  ),
};

describe("DOM structure snapshots", () => {
  for (const [name, element] of Object.entries(cases)) {
    it(name, () => {
      const { container } = render(element);
      expect(container.innerHTML).toMatchSnapshot();
    });
  }
});
