import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./components/Button";
import { Badge } from "./components/Badge";
import { Input } from "./components/Input";
import { Textarea } from "./components/Textarea";
import { Checkbox } from "./components/Checkbox";
import { Switch } from "./components/Switch";
import { Slider } from "./components/Slider";
import { Progress } from "./components/Progress";
import { Skeleton } from "./components/Skeleton";
import { Spinner } from "./components/Spinner";
import { Alert } from "./components/Alert";
import { Avatar, AvatarGroup } from "./components/Avatar";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";
import { Tabs } from "./components/Tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/Accordion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/Select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components/Table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./components/Dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./components/DropdownMenu";
import { Popover, PopoverTrigger, PopoverContent } from "./components/Popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./components/Tooltip";
import { Toaster, toast } from "./components/Toast";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/Breadcrumb";
import { Pagination, PaginationItem, PaginationEllipsis } from "./components/Pagination";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./components/Command";
import { DatePicker } from "./components/Calendar";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarNav,
  SidebarNavItem,
  AppShell,
} from "./components/Sidebar";
import { DARK_PALETTE, LIGHT_PALETTE } from "./tokens/palettes";

const meta: Meta = {
  title: "Fors/Overview",
  parameters: {
    layout: "fullscreen",
    // This story is a full page with a real <main> landmark, so re-enable the
    // `region` rule the test runner turns off for isolated component stories.
    a11y: { options: { rules: { region: { enabled: true } } } },
  },
};
export default meta;
type Story = StoryObj;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <Heading id={id} as="h2" size="sm" className="text-fg-secondary">
        {title}
      </Heading>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

const swatchGroups: { label: string; keys: string[] }[] = [
  { label: "Ink", keys: ["bg", "surface", "surface2"] },
  {
    label: "Accent — Rapids Teal",
    keys: ["accent", "accentHover", "accentActive", "accentSubtle"],
  },
  { label: "Spark — Amber", keys: ["spark", "sparkHover", "sparkSubtle"] },
  { label: "Semantic", keys: ["danger", "success", "warning"] },
];

const deployments = [
  { id: "dpl_a1", branch: "main", status: "Ready", env: "Production", when: "2m ago" },
  { id: "dpl_b2", branch: "feat/onboarding", status: "Building", env: "Preview", when: "just now" },
  { id: "dpl_c3", branch: "fix/nav-focus", status: "Error", env: "Preview", when: "14m ago" },
];

const statusVariant: Record<string, "success" | "warning" | "danger"> = {
  Ready: "success",
  Building: "warning",
  Error: "danger",
};

function KitchenSink() {
  const [email, setEmail] = React.useState("marc@forscorp.com");
  const [plan, setPlan] = React.useState("rapids");
  const [notify, setNotify] = React.useState(true);
  const [previews, setPreviews] = React.useState(true);
  const [concurrency, setConcurrency] = React.useState(40);
  const [saving, setSaving] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [deployDate, setDeployDate] = React.useState<Date | undefined>();

  const emailInvalid = !email.includes("@");

  function runCommand(action: () => void) {
    setCommandOpen(false);
    action();
  }

  const TOTAL_PAGES = 12;
  const pageWindow = React.useMemo(() => {
    const set = new Set([1, TOTAL_PAGES, page, page - 1, page + 1]);
    return [...set].filter((n) => n >= 1 && n <= TOTAL_PAGES).sort((a, b) => a - b);
  }, [page]);

  function handleSave() {
    if (emailInvalid) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast({
        variant: "success",
        title: "Settings saved",
        description: `${plan} plan · previews ${previews ? "on" : "off"} · limit ${concurrency}`,
      });
    }, 800);
  }

  return (
    <TooltipProvider delayDuration={200}>
      <main className="min-h-screen bg-ink-bg p-4 sm:p-8 lg:p-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-14 sm:gap-16">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Heading as="h1" size="2xl">
                Fors Design System
              </Heading>
              <Text tone="secondary">
                Rapids Teal on near-black ink · Space Grotesk + Inter · 30 components, dark &amp;
                light, responsive, WCAG&nbsp;AA
              </Text>
            </div>
            <Button variant="secondary" onClick={() => setCommandOpen(true)}>
              Quick actions…
            </Button>
          </header>

          <Section id="ov-color" title="Color tokens (dark palette shown)">
            <div className="flex flex-col gap-4">
              {swatchGroups.map((group) => (
                <div key={group.label} className="flex flex-col gap-1.5">
                  <Text size="sm" tone="muted">
                    {group.label}
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {group.keys.map((k) => {
                      const hex = (DARK_PALETTE as unknown as Record<string, string>)[k];
                      return (
                        <div key={k} className="flex flex-col gap-1">
                          {/* border-2 in the mid-tone fg-muted stays visible on both
                              near-black and near-white pages, so a swatch whose colour
                              is close to the page background still shows its extent. */}
                          <div
                            className="h-12 w-20 rounded-md border-2 border-fg-muted shadow-sm sm:w-24"
                            style={{ background: hex }}
                            title={`${k} · ${hex}`}
                          />
                          <Text size="xs" tone="muted" className="font-mono">
                            {k}
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="ov-type" title="Typography">
            <div className="flex flex-col gap-1">
              <p className="font-heading text-3xl font-semibold text-fg sm:text-4xl">
                Build faster. Own it forever.
              </p>
              <p className="font-heading text-xl font-semibold text-fg">
                Section heading — Space Grotesk
              </p>
              <Text>
                Body copy is Inter at a comfortable reading size. The quick brown fox jumps over the
                lazy dog.
              </Text>
              <Text tone="secondary">Secondary text for supporting detail.</Text>
              <Text tone="muted" size="sm">
                Muted caption text.
              </Text>
            </div>
          </Section>

          <Section id="ov-buttons" title="Buttons">
            <Row>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="spark">Spark</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Row>
            <Row>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Row>
          </Section>

          <Section id="ov-badges" title="Badges">
            <Row>
              <Badge>Draft</Badge>
              <Badge variant="accent">New</Badge>
              <Badge variant="spark">Featured</Badge>
              <Badge variant="success">Shipped</Badge>
              <Badge variant="warning">Pending review</Badge>
              <Badge variant="danger">Failed</Badge>
            </Row>
          </Section>

          <Section id="ov-controls" title="Interactive settings form">
            <form
              className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ov-email" className="font-sans text-sm font-medium text-fg">
                  Billing email
                </label>
                <Input
                  id="ov-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={emailInvalid}
                  hint={emailInvalid ? "Enter a valid email address." : undefined}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="ov-plan" className="font-sans text-sm font-medium text-fg">
                  Plan
                </label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger id="ov-plan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="rapids">Rapids</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="ov-deploy-date" className="font-sans text-sm font-medium text-fg">
                  Scheduled deploy date
                </label>
                <DatePicker
                  id="ov-deploy-date"
                  value={deployDate}
                  onValueChange={setDeployDate}
                  placeholder="No date scheduled"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5 [grid-column:1/-1]">
                <label htmlFor="ov-notes" className="font-sans text-sm font-medium text-fg">
                  Deployment notes
                </label>
                <Textarea id="ov-notes" placeholder="Optional context for your team…" rows={2} />
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <Checkbox checked={notify} onCheckedChange={(v) => setNotify(v === true)} />
                  <Text size="sm">Email me about deploy failures</Text>
                </label>
                <label className="flex items-center gap-2">
                  <Switch checked={previews} onCheckedChange={setPreviews} />
                  <Text size="sm">Enable preview deployments</Text>
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="ov-conc" className="font-sans text-sm text-fg-muted">
                  Concurrency limit: {concurrency}
                </label>
                <Slider
                  id="ov-conc"
                  value={[concurrency]}
                  onValueChange={([v]) => setConcurrency(v)}
                  max={100}
                  aria-label="Concurrency limit"
                />
              </div>

              <div className="flex items-center gap-3 [grid-column:1/-1]">
                <Button type="submit" loading={saving} disabled={emailInvalid}>
                  {saving ? "Saving…" : "Save settings"}
                </Button>
                <Text size="sm" tone="muted">
                  Submits with a real loading state, then fires a toast.
                </Text>
              </div>
            </form>
          </Section>

          <Section id="ov-overlays" title="Overlays">
            <Row>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="danger">Delete project…</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete this project?</DialogTitle>
                    <DialogDescription>
                      This removes the project, its deployments, and its environment variables. This
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="danger">Delete</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Row actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Redeploy</DropdownMenuItem>
                  <DropdownMenuItem>Copy URL</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Filter</Button>
                </PopoverTrigger>
                <PopoverContent aria-label="Filter deployments">
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> <Text size="sm">Production</Text>
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> <Text size="sm">Preview</Text>
                    </label>
                  </div>
                </PopoverContent>
              </Popover>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="Help">
                    ?
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Deploys trigger on every push to a connected branch.
                </TooltipContent>
              </Tooltip>

              <Button
                variant="secondary"
                onClick={() =>
                  toast({ title: "Redeploy queued", description: "main → Production" })
                }
              >
                Fire a toast
              </Button>
            </Row>
          </Section>

          <Section id="ov-feedback" title="Feedback &amp; status">
            <div className="flex flex-col gap-3">
              <Alert variant="accent" title="Heads up">
                A new region is available for deployments.
              </Alert>
              <Alert variant="success" title="Deployed">
                fors-client-portal is live in production.
              </Alert>
              <Alert variant="danger" title="Build failed">
                Type error in <code className="font-mono">src/routes/api.ts</code>.
              </Alert>
              <Row>
                <div className="min-w-0 flex-1">
                  <Progress value={68} aria-label="Upload progress" />
                </div>
                <Spinner label="Loading" />
              </Row>
              <Row>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-24" />
              </Row>
            </div>
          </Section>

          <Section id="ov-people" title="People">
            <Row>
              <Avatar initials="MF" alt="Marc Fors" />
              <Avatar initials="JD" alt="Jamie Doe" size="lg" />
              <AvatarGroup max={3}>
                <Avatar initials="MF" alt="Marc Fors" />
                <Avatar initials="JD" alt="Jamie Doe" />
                <Avatar initials="AK" alt="Alex Kim" />
                <Avatar initials="RL" alt="Robin Lee" />
                <Avatar initials="SP" alt="Sam Park" />
              </AvatarGroup>
            </Row>
          </Section>

          <Section id="ov-data" title="Data &amp; layout">
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
              <Card>
                <CardHeader>
                  <CardTitle>Rapids plan</CardTitle>
                  <CardDescription>For teams shipping client work every week.</CardDescription>
                </CardHeader>
                <CardContent>Unlimited projects, custom branding, priority support.</CardContent>
                <CardFooter>
                  <Button size="sm">Choose plan</Button>
                  <Button size="sm" variant="ghost">
                    Compare
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <Tabs.Root defaultValue="overview">
                  <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Panel value="overview" className="pt-3">
                    Deployment health, traffic, and error rate at a glance.
                  </Tabs.Panel>
                  <Tabs.Panel value="activity" className="pt-3">
                    Recent deploys and rollbacks.
                  </Tabs.Panel>
                  <Tabs.Panel value="settings" className="pt-3">
                    Environment variables and access.
                  </Tabs.Panel>
                </Tabs.Root>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Deployed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deployments.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-mono">{d.branch}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[d.status]}>{d.status}</Badge>
                    </TableCell>
                    <TableCell>{d.env}</TableCell>
                    <TableCell>{d.when}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Accordion
              type="single"
              collapsible
              defaultValue="a"
              className="rounded-lg border border-ink-border px-4"
            >
              <AccordionItem value="a">
                <AccordionTrigger>How does billing work?</AccordionTrigger>
                <AccordionContent>
                  Billed monthly by plan. Upgrades apply immediately; downgrades next cycle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                <AccordionContent>Yes — you keep access until the period ends.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Section id="ov-nav" title="Navigation">
            <Breadcrumb>
              <BreadcrumbList>
                {["Projects", "fors-client-portal"].map((crumb) => (
                  <React.Fragment key={crumb}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#ov-nav"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: `Navigate to ${crumb}`,
                            description: "(demo — no routing here)",
                          });
                        }}
                      >
                        {crumb}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-2">
              <Pagination>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </Button>
                {pageWindow.map((n, i) => (
                  <React.Fragment key={n}>
                    {i > 0 && n - pageWindow[i - 1] > 1 && <PaginationEllipsis />}
                    <PaginationItem active={n === page} onClick={() => setPage(n)}>
                      {n}
                    </PaginationItem>
                  </React.Fragment>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page === TOTAL_PAGES}
                  onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                >
                  Next
                </Button>
              </Pagination>
              <Text size="sm" tone="muted" aria-live="polite">
                Page {page} of {TOTAL_PAGES}
              </Text>
            </div>
          </Section>

          <Section id="ov-shell" title="App shell">
            {/* A contained preview, not a real full-page AppShellMain — this
                page already has its own <main> landmark, and nesting a
                second one would be an actual accessibility violation. See
                Sidebar.stories.tsx's own AppShellExample for the real,
                standalone full-page composition. */}
            <div className="h-80 overflow-hidden rounded-lg border border-ink-border">
              <SidebarProvider>
                <AppShell className="h-full">
                  <Sidebar label="Demo navigation">
                    <SidebarHeader>
                      <Text weight="semibold">Fors Corp</Text>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarNav>
                        <SidebarNavItem href="#ov-shell" active>
                          Overview
                        </SidebarNavItem>
                        <SidebarNavItem href="#ov-shell">Settings</SidebarNavItem>
                      </SidebarNav>
                    </SidebarContent>
                    <SidebarFooter>
                      <Text size="sm" tone="muted">
                        v1.0
                      </Text>
                    </SidebarFooter>
                  </Sidebar>
                  <div className="min-w-0 flex-1 overflow-y-auto p-4">
                    <SidebarTrigger />
                    <Text className="mt-3" tone="secondary">
                      Collapses to an icon rail on desktop, becomes a slide-in drawer below the md
                      breakpoint.
                    </Text>
                  </div>
                </AppShell>
              </SidebarProvider>
            </div>
          </Section>

          <footer className="border-t border-ink-border pt-4">
            <Text size="sm" tone="muted">
              {Object.keys(LIGHT_PALETTE).length} tokens per theme · switch the Theme toolbar above
              to see light mode · resize the window to check responsiveness.
            </Text>
          </footer>
        </div>
        <Toaster />
        <CommandDialog
          open={commandOpen}
          onOpenChange={setCommandOpen}
          label="Quick actions"
          description="Search for an action to run against fors-client-portal."
        >
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Deploy">
              <CommandItem
                onSelect={() =>
                  runCommand(() =>
                    toast({ title: "Redeploy queued", description: "main → Production" })
                  )
                }
              >
                Redeploy production
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setPage(1))}>
                Jump to first deployment page
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => runCommand(() => setNotify((v) => !v))}>
                Toggle failure emails
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setPreviews((v) => !v))}>
                Toggle preview deployments
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </main>
    </TooltipProvider>
  );
}

export const Kitchen: Story = {
  render: () => <KitchenSink />,
};

/**
 * The same page under `dir="rtl"` — the fastest whole-system check that
 * logical-property/`rtl:` conversions actually hold together, the same
 * role `Kitchen` plays for the light/dark themes. Verify at 375px and
 * desktop, same as `Kitchen`.
 */
export const KitchenSinkRTL: Story = {
  render: () => (
    <div dir="rtl">
      <KitchenSink />
    </div>
  ),
};
