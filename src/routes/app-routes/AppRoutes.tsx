import { Navigate, Route, Routes } from "react-router-dom";
import AiAssistantPage from "../../pages/app-pages/ai-assistant-page/AiAssistantPage";
import ChatPage from "../../pages/app-pages/chat-page/ChatPage";
import DashboardPage from "../../pages/app-pages/dashboard-page/DashboardPage";
import ProjectsPage from "../../pages/app-pages/projects-page/ProjectsPage";
import SettingsPage from "../../pages/app-pages/settings-page/SettingsPage";
import TasksPage from "../../pages/app-pages/tasks-page/TasksPage";
import UsersPage from "../../pages/app-pages/users-page/UsersPage";
import PageNotFound from "../../pages/error-pages/not-found-page/PageNotFound";
import PermissionGate from "../../components/ui/permission-gate/PermissionGate";
import { usePermission } from "../../hooks/usePermission";

const HomeRedirect = () => {
  const { getDefaultPath } = usePermission();
  // "/" is not a real page — always land on first permitted route
  return <Navigate to={getDefaultPath()} replace />;
};

const withPermission = (permission: string, element: React.ReactNode) => (
  <PermissionGate permission={permission}>{element}</PermissionGate>
);

const routesList = [
  { id: 1, path: "/", element: <HomeRedirect /> },
  {
    id: 2,
    path: "/dashboard",
    element: withPermission("dashboard:view", <DashboardPage />),
  },
  {
    id: 3,
    path: "/projects",
    element: withPermission("projects:view", <ProjectsPage />),
  },
  {
    id: 4,
    path: "/tasks",
    element: withPermission("tasks:view", <TasksPage />),
  },
  {
    id: 5,
    path: "/users",
    element: withPermission("users:view", <UsersPage />),
  },
  {
    id: 6,
    path: "/settings",
    element: withPermission("settings:view", <SettingsPage />),
  },
  {
    id: 7,
    path: "/ai",
    element: withPermission("ai:view", <AiAssistantPage />),
  },
  {
    id: 8,
    path: "/chat",
    element: withPermission("chat:view", <ChatPage />),
  },
  {
    id: 9,
    path: "/unauthorized",
    element: (
      <div className="flex h-full items-center justify-center p-6 text-sm text-app-text-muted">
        You do not have access to any pages. Contact your admin.
      </div>
    ),
  },
  { id: 10, path: "*", element: <PageNotFound /> },
];

const AppRoutes = () => {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <Routes>
        {routesList.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default AppRoutes;
