import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostPage = () => {
  const { postId } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setPost(result.post);
        console.log(result.post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <p>{post.title}</p>
      {post.category && <h2>{post.category.title}</h2>}

      <p>{new Date(post.createdAt).toDateString()}</p>
      <p>{post.postBody}</p>
    </>
  );
};

export { PostPage };
