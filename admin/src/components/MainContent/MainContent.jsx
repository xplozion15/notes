import { PostsAndCategories } from "../PostsAndCategories/PostsAndCategories";
import {Stats} from "../Stats/Stats";

const MainContent = () => {
  return (
    <>
      <h1>Admin dashboard</h1>
      <div>
        <button>Create Post</button>
        <button>Create Categories</button>
      </div>
      <Stats/>
      <PostsAndCategories />
    </>
  );
};

export { MainContent };
