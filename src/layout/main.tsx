import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/app.context";

const MainLayout = () => {
  const { auth } = useApp();
  const location = useLocation();

  if (auth?.isAuth && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  if (!auth?.isAuth && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
