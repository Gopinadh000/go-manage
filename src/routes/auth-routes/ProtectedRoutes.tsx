import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../services/context/auth-context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center w-full justify-center text-app text-app-text-muted'>
        <CircularProgress aria-label='Loading…' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
