import App from "../App";
import { Login } from "../components/Login/Login";
import { MainContent } from "../components/MainContent/MainContent";
import { Error404 } from "../components/Error404/Error404";
import { EditPost } from "../components/EditPost/EditPost";
import { NewPost } from "../components/NewPost/NewPost";
import { EditCategory } from "../components/EditCategory/EditCategory";
import { NewCategory } from "../components/NewCategory/NewCategory";

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
      {
        path: "posts/:postId/edit",
        element: <EditPost />,
      },
      {
        path: "posts/new",
        element: <NewPost />,
      },
      {
        path: "categories/:categoryId/edit",
        element: <EditCategory />,
      },
      { 
        path : "categories/new",
        element : <NewCategory/>,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export { routes };
