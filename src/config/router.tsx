import { RouteObject } from "react-router-dom";
// import HomePage from "@/pages/home";
import LazyWrapper from "@/components/lazy-wrapper";

const ROUTER_CONFIG: RouteObject[] = [
  {
    path: "/",
    // element: <HomePage />,
    element: <LazyWrapper path="/home" />,
    // element: <LazyWrapper path="/home/index-old" />,
  },
  {
    path: "*",
    element: <>404 Not Found</>,
  },
];

export { ROUTER_CONFIG };
