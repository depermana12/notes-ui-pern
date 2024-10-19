import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRouteLayout = () => {
  const { authenticated } = useAuth();

  return authenticated() ? <Outlet /> : <div>Unauthorized</div>;
};

export default ProtectedRouteLayout;
