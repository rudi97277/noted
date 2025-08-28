import BaseLayout from "@/layouts/base";
import Application from "@/pages/application";
import Board from "@/pages/board";
import Dashboard from "@/pages/dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "board",
        Component: Board,
      },
      {
        path: "application",
        Component: Application,
      },
    ],
  },
]);
