---
"@marcfs31/design-system": minor
---

Add `Sidebar`/`AppShell` — a page-shell layout primitive: `SidebarProvider`/`useSidebar` for shared collapsed/mobile-open state, `Sidebar` (a desktop icon-rail that collapses, or a mobile slide-in drawer built on Radix Dialog below the `md` breakpoint), `SidebarHeader`/`SidebarContent`/`SidebarFooter` layout slots, `SidebarNav`/`SidebarNavItem` for plain nav links, `SidebarTrigger`, and `AppShell`/`AppShellMain` for the page's flex container and its single `<main>` landmark. No new dependency — reuses `@radix-ui/react-dialog`, already in this package.
