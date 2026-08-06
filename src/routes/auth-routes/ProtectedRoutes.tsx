
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../services/context/auth-context/AuthContext";

const ProtectedRoutes = () => {
    const {isAuthenticated , isLoading} = useAuth()

    if(isLoading){
        return <div className="flex h-screen items-center justify-center text-app text-app-text-muted">...Loading</div>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

  return  <Outlet/>
};

export default ProtectedRoutes;
