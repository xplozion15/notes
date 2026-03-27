import App from "../App";
import { Login } from "../components/Login/Login";
import { About } from "../components/About/About";
import { BlogPosts } from "../components/BlogPosts/BlogPosts";
import { Category } from "../components/Category/Catogory";
import { Register } from "../components/Register/Register";
import { Error404 } from "../components/Error404/Error404";
import { PostPage } from "../components/PostPage/PostPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <BlogPosts /> },
      { path: "about", element: <About /> },
      { path: "categories/:categoryId/posts", element: <Category /> },
      { path: "posts/:postId", element: <PostPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
];

export { routes };
