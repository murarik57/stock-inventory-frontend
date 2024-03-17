import React, { useMemo } from "react";
import routes from "Utils/routes";
import { Route, Routes } from "react-router-dom";
import NotFound from "Components/NotFound";
import AppLayoutContainer from "Layouts/AppLayout";
import Dashboard from "dashboard/Dashboard";

const { DASHBOARD, APP } = routes;

export interface RouteObject {
  path: string;
  element: React.ReactNode;
}

const AppRoutes: React.FC = () => {
  const mRoutes = useMemo(() => {
    const appRoutes: RouteObject[] = [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
    ];

    appRoutes.map((route) => {
      route.path = route.path.replace(APP, "");
      return route;
    });

    return appRoutes;
  }, []);

  return (
    <AppLayoutContainer>
      <Routes>
        {mRoutes.map((routeProps) => (
          <Route key={routeProps.path} {...routeProps} />
        ))}

        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </AppLayoutContainer>
  );
};

export default AppRoutes;
