import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootBoundary from "Utils/RootBoundary";
import routes from "Utils/routes";
import PrivateRoute from "./PrivateRoute";
import LoginContainer from "authContainer/LoginContainer";
import AppRoutes from "./AppRoutes";

const { ROOT, APP } = routes;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT} errorElement={<RootBoundary />}>
      <Route index element={<LoginContainer />} />
      <Route
        path={`${APP}/*`}
        element={<PrivateRoute component={AppRoutes} />}
      />
      <Route path="*" element={<Navigate to={ROOT} replace />} />
    </Route>,
  ),
);
const RenderRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RenderRouter;
