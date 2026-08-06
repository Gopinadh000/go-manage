import React from "react";
import { Route, Routes } from 'react-router-dom'
import PublicRoutes from "./auth-routes/PublicRoutes";
import LoginPage from "../pages/auth-pages/login-page/LoginPage";
import RegisterPage from "../pages/auth-pages/register-page/RegisterPage";
import ProtectedRoutes from "./auth-routes/ProtectedRoutes";
import Layout from "./app-routes/Layout";
import PageNotFound from "../pages/error-pages/not-found-page/PageNotFound";

const RoutesWrapper = () => {
  return (
    <Routes>
     
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default RoutesWrapper