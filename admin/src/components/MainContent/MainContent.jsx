import { PostsAndCategories } from "../PostsAndCategories/PostsAndCategories";
import {Stats} from "../Stats/Stats";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <h1>Admin dashboard</h1>
      <div>
        <Link to="/posts/new">Create post</Link>
        <Link to="/categories/new">Create category</Link>
      </div>
      <Stats/>
      <PostsAndCategories />
      
    </>

  );
};

export { MainContent };


