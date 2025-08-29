import BaseLayout from "@/layouts/base";
import Dashboard from "@/pages/dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: BaseLayout,
      children: [
        {
          index: true,
          Component: Dashboard,
        },
      ],
    },
  ],
  { basename: "/itsnoted" }
);
