import UseUser from "@/hook/UseActiveUser";

import { Navigate, useLocation } from "react-router-dom";
import { AdminRouteProps } from "./AdminRoute";

const PrivateRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const {isLoggedIn} = UseUser();

  const location = useLocation();

  if (isLoggedIn) return children;

  return <Navigate to="/signin" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
