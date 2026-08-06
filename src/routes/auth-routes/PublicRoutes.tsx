import { useAuth } from "../../services/context/auth-context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom'


const PublicRoutes = () => {

    const {isAuthenticated , isLoading} = useAuth()

    if(isLoading){
        return <div className="flex h-screen items-center justify-center text-app text-app-text-muted">...Loading</div>
    }

    if(isAuthenticated){
        return <Navigate to="/" replace/>
    }

  return  <Outlet/>
};

export default PublicRoutes;
