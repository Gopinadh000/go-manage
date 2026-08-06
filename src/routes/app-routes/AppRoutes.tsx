import AiAssistantPage from "../../pages/app-pages/ai-assistant-page/AiAssistantPage";
import ChatPage from "../../pages/app-pages/chat-page/ChatPage";
import DashboardPage from "../../pages/app-pages/dashboard-page/DashboardPage";
import ProjectsPage from "../../pages/app-pages/projects-page/ProjectsPage";
import SettingsPage from "../../pages/app-pages/settings-page/SettingsPage";
import TasksPage from "../../pages/app-pages/tasks-page/TasksPage";
import UsersPage from "../../pages/app-pages/users-page/UsersPage";
import { Route, Routes } from 'react-router-dom'
import PageNotFound from "../../pages/error-pages/not-found-page/PageNotFound";



const routesList = [
  { id: 1, path: '/', element: <DashboardPage /> },
  { id: 2, path: '/dashboard', element: <DashboardPage /> },
  { id: 3, path: '/projects', element: <ProjectsPage /> },
  { id: 4, path: '/tasks', element: <TasksPage /> },
  { id: 5, path: '/settings', element: <SettingsPage /> },
  { id: 6, path: '/ai', element: <AiAssistantPage /> },
  { id: 7, path: '/chat', element: <ChatPage /> },
  { id: 8, path: '/users', element: <UsersPage /> },
  { id: 9, path: '*', element: <PageNotFound /> },
]

const AppRoutes = () => {
  return <>
 <div className="flex h-full min-h-0 flex-1 flex-col">
      <Routes>
        {routesList.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  </>;
};

export default AppRoutes;
