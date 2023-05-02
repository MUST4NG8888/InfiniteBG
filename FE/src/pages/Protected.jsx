import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";

const Protected = () => {
  const user = useRXjs($user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protected;
