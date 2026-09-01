import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePermission } from "../../../hooks/usePermission";

type PermissionGateProps = {
  permission: string;
  children: ReactNode;
};

/**
 * Route-level gate: if the user lacks `permission`, send them to their
 * first allowed page (projects/tasks preferred) instead of rendering.
 */
const PermissionGate = ({ permission, children }: PermissionGateProps) => {
  const { can, getDefaultPath } = usePermission();

  if (!can(permission)) {
    return <Navigate to={getDefaultPath()} replace />;
  }

  return <>{children}</>;
};

export default PermissionGate;
