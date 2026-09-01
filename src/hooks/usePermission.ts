import { useAuth } from "../services/context/auth-context/AuthContext";
import { getDefaultAppPath } from "../components/layout/sidebar/sidebar-data";

export const usePermission = () => {
  const { permissions } = useAuth();

  const can = (permission: string) => {
    return permissions.includes(permission);
  };

  const getDefaultPath = () => getDefaultAppPath(permissions);

  return {
    can,
    permissions,
    getDefaultPath,
  };
};
