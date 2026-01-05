import { StrictMode } from 'react'
import App from './App.jsx'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {MainLayout} from "./layout/MainLayout.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path : "/",
    element   : <MainLayout/>,
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
