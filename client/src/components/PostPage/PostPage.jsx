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
        setPost(result);
        console.log(result);
        
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <p>single post here </p>
    </>
  );
};

export { PostPage };
