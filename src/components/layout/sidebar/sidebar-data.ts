export type SidebarItem = {
  key: string;
  label: string;
  path: string;
  icon: string;
  permission: string;
};

/**
 * Order here = sidebar order AND default landing priority.
 * Dashboard is first when the user has `dashboard:view`.
 * Otherwise the next permitted item (projects, tasks, …) is used.
 * Dashboard path is /dashboard so "/" can redirect via getDefaultAppPath.
 */
export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "DashboardOutlined",
    permission: "dashboard:view",
  },
  {
    key: "projects",
    label: "Projects",
    path: "/projects",
    icon: "FolderOutlined",
    permission: "projects:view",
  },
  {
    key: "tasks",
    label: "My Tasks",
    path: "/tasks",
    icon: "TaskOutlined",
    permission: "tasks:view",
  },
  {
    key: "users",
    label: "Users",
    path: "/users",
    icon: "PeopleAltOutlined",
    permission: "users:view",
  },
  {
    key: "ai",
    label: "AI Assistant",
    path: "/ai",
    icon: "SmartToyOutlined",
    permission: "ai:view",
  },
  {
    key: "chat",
    label: "Chat",
    path: "/chat",
    icon: "ChatOutlined",
    permission: "chat:view",
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: "SettingsOutlined",
    permission: "settings:view",
  },
];

/**
 * First permitted sidebar item (dashboard → projects → tasks → …).
 */
export function getDefaultAppPath(permissions: string[]): string {
  const firstAllowed = SIDEBAR_ITEMS.find((item) =>
    permissions.includes(item.permission),
  );

  return firstAllowed?.path ?? "/unauthorized";
}

export function getRoutePermission(path: string): string | null {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "") || "/";
  const item = SIDEBAR_ITEMS.find((entry) => entry.path === normalized);
  return item?.permission ?? null;
}
