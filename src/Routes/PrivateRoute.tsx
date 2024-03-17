import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "Utils/commonFunction";
import routes from "Utils/routes";
interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={routes.ROOT} state={{ from: location }} replace />;
  }

  return <Component />;
};

export default PrivateRoute;
