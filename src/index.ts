"use client";

// Every component in this entry is interactive (hooks / Radix), so the whole
// bundle is a client module — drop-in usable inside React Server Components
// without a wrapper. Server-safe theme/token utilities live in the separate
// "@marcfs31/fors-design-system/theme" entry (see src/theme-entry.ts).

export { Button, type ButtonProps } from "./components/Button";
export { Badge, type BadgeProps } from "./components/Badge";
export { Input, type InputProps } from "./components/Input";
export { Textarea, type TextareaProps } from "./components/Textarea";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
} from "./components/Card";
export { Alert, type AlertProps } from "./components/Alert";
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps } from "./components/Avatar";
export { Tabs } from "./components/Tabs";
export { Heading, type HeadingProps } from "./components/Heading";
export { Text, type TextProps } from "./components/Text";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export { RadioGroup, RadioGroupItem } from "./components/RadioGroup";
export { Switch } from "./components/Switch";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./components/Select";
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./components/Dialog";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  type DropdownMenuItemProps,
} from "./components/DropdownMenu";
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./components/Tooltip";
export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
  Toaster,
  toast,
  dismissToast,
  useToast,
  type ToastRootProps,
} from "./components/Toast";
export { Spinner, type SpinnerProps } from "./components/Spinner";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components/Table";
export { Progress, type ProgressProps } from "./components/Progress";
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent } from "./components/Popover";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/Accordion";
export { Slider } from "./components/Slider";
export { Skeleton } from "./components/Skeleton";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/Breadcrumb";
export {
  Pagination,
  PaginationItem,
  PaginationEllipsis,
  type PaginationItemProps,
} from "./components/Pagination";
export { Separator, type SeparatorProps } from "./components/Separator";
export { Label, type LabelProps } from "./components/Label";
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/Collapsible";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  type CommandProps,
  type CommandDialogProps,
} from "./components/Command";
export {
  Calendar,
  DatePicker,
  type CalendarProps,
  type DatePickerProps,
} from "./components/Calendar";
export { ConfirmDialog, type ConfirmDialogProps } from "./components/ConfirmDialog";
export {
  TablePagination,
  pageRange,
  type TablePaginationProps,
  type TablePaginationLabels,
  type PageRangeItem,
} from "./components/TablePagination";
export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarNav,
  SidebarNavItem,
  AppShell,
  AppShellMain,
  type SidebarContextValue,
  type SidebarProviderProps,
  type SidebarProps,
  type SidebarNavItemProps,
} from "./components/Sidebar";

export { cn } from "./lib/cn";
