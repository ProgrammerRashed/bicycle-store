import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import { useSelector } from "react-redux";

const UseActiveUser = () => {
  const data = useSelector(selectCurrentUser);
  const user = data;
  const isAdmin = user?.role === "admin" 
  const isLoggedIn = user?.email !== undefined
  return {user, isAdmin, isLoggedIn};
};

export default UseActiveUser;
