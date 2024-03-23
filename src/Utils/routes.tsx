const routes = {
  ROOT: "/",
  // app routes start
  APP: "/app",

  DASHBOARD: "/app/dashboard",

  PRODUCT: "/app/product",
  ORDER: "/app/order",
  VIEW_ORDER: "/app/order/:id",
  NEW_ORDER: "/app/order/new",
};

Object.freeze(routes);
export default routes;
