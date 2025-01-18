import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const routes = await flatRoutes();

const allRoutes = [
  ...routes,
  route("/*", "./catchall.tsx"),
] satisfies RouteConfig;

export default allRoutes;
