import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Main, Login, TaskDetail } from "../pages";
import MainLayout from "../layout/main";

const Navigation = () => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/login" /> },
      { path: "/", element: <Main /> },
      { path: "login", element: <Login /> },
      { path: "ticket/:ticketid", element: <TaskDetail /> },
    ],
  };
  const routing = useRoutes([mainRoutes]);
  return <>{routing}</>;
};

export default Navigation;
