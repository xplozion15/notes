import { StrictMode } from "react";
import App from "./App.jsx";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { routes } from "./routes/routes.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
