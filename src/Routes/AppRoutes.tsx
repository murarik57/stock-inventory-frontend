import React, { useMemo } from "react";
import routes from "Utils/routes";
import { Route, Routes } from "react-router-dom";
import NotFound from "Components/NotFound";
import AppLayoutContainer from "Layouts/AppLayout";
import Dashboard from "dashboard/Dashboard";
import ProductList from "products/ProductList";
import OrderList from "orders/OrderList";
import CreateOrder from "orders/components/CreateOrder";
import ViewOrer from "orders/components/ViewOrer";

const { DASHBOARD, APP, PRODUCT, ORDER, NEW_ORDER, VIEW_ORDER } = routes;

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
      {
        path: PRODUCT,
        element: <ProductList />,
      },
      {
        path: ORDER,
        element: <OrderList />,
      },
      {
        path: NEW_ORDER,
        element: <CreateOrder />,
      },
      {
        path: VIEW_ORDER,
        element: <ViewOrer />,
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
