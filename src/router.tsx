import { createBrowserRouter } from "react-router";

import App from "@/App";
import AssignmentBriefPage from "@/pages/assignmentBrief/AssignmentBriefPage";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AssignmentBriefPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);