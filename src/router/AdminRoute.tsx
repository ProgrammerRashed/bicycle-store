import UseUser from "@/hook/UseActiveUser";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const {isAdmin} = UseUser();

  if (isAdmin) return children;

  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
