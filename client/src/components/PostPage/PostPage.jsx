import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PostPage.module.css";
import { Comments } from "../Comments/Comments";

const PostPage = () => {
  const { postId } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setPost(result.post);
        setComments(result.post.comments);
        console.log(result.post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    const getCurrentUserId = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
       
        
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) throw new Error(`Response status ${response.status}`);

        const result = await response.json();
        console.log(result);

        setCurrentUserId(result.id);
      } catch (error) {
        throw new Error(`error - ${error}`);
      }
    };

    fetchPost();
    getCurrentUserId();
  }, []);

  return (
    <>
      <div className={styles.post}>
        <p>{post.title}</p>
        {post.category && <h2>{post.category.title}</h2>}

        <p>{new Date(post.createdAt).toDateString()}</p>
        <p>{post.postBody}</p>
      </div>

      <Comments
        comments={comments}
        setComments={setComments}
        postId={postId}
        userId={currentUserId}
      />
    </>
  );
};

export { PostPage };
