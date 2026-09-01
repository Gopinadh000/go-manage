import { useAuth } from "../../services/context/auth-context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { getDefaultAppPath } from "../../components/layout/sidebar/sidebar-data";

const PublicRoutes = () => {
  const { isAuthenticated, isLoading, permissions } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-app text-app-text-muted">
        ...Loading
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultAppPath(permissions)} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
