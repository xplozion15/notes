import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogPosts = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setPosts(result.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <div>
            <p>{post.title}</p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export { BlogPosts };
