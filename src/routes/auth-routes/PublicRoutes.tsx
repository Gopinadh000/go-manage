import { useAuth } from '../../services/context/auth-context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { getDefaultAppPath } from '../../components/layout/sidebar/sidebar-data';
import CircularProgress from '@mui/material/CircularProgress';

const PublicRoutes = () => {
  const { isAuthenticated, isLoading, permissions } = useAuth();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center w-full  justify-center text-app text-app-text-muted'>
        <CircularProgress aria-label='Loading…' />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={getDefaultAppPath(permissions)}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoutes;
