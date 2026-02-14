import App from "../App";
import { Login } from "../components/Login/Login";
import { MainContent } from "../components/MainContent/MainContent";
import { Error404 } from "../components/Error404/Error404";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <MainContent />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export { routes };
