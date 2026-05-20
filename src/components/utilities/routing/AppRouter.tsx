import { RouterProvider } from "react-router";

import { router } from "@/router";

const AppRouterContent = () => {
  return <RouterProvider router={router} />;
};

export const AppRouter = () => {
  return <AppRouterContent />;
};