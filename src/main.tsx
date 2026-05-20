import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "@/components/utilities/routing/AppRouter";

import "@/assets/index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Failed to find the root element");
}

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);