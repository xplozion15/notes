import App from "../App";
import { Login } from "../components/Login/Login";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export { routes };
