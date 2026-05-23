import { createBrowserRouter } from "react-router";

import App from "@/App";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import ProductPage from "@/pages/product/ProductPage";
import CartPage from "@/pages/cart/CartPage";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesConfig);