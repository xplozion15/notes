import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostPreview } from "../../utils/postPreview";
import { getReadingStats } from "../../utils/readingStats";
import styles from "./Category.module.css";
import { Book } from "lucide-react";
import { Calendar } from "lucide-react";

const Category = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsById = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/${categoryId}/posts`,
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setPosts(result.categoryPosts);
        console.log(result.categoryPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPostsById();
  }, [categoryId]);

  return (
    <>
      {posts.map((post) => {
        const postPreviewText = getPostPreview(post.postBody);
        const { wordCount, estimatedReadTime } = getReadingStats(post.postBody);

        return (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div>
              <p>{post.title}</p>
              <p>{postPreviewText}</p>
              <p>{post.category.title}</p>
              <p>
                {wordCount} words. | {estimatedReadTime} minutes.
              </p>
              <p>{new Date(post.createdAt).toDateString()}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export { Category };
