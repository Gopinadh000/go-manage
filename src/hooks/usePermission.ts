import { useAuth } from "../services/context/auth-context/AuthContext";


export const usePermission = () => {
  const { permissions } = useAuth();

  const can = (permission: string) => {
    return permissions.includes(permission);
  };

  return {
    can
  };
};