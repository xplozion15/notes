import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostPreview } from "../../utils/postPreview";
import { getReadingStats } from "../../utils/readingStats";

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
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      {posts.map((post) => {
        const postPreviewText = getPostPreview(post.postBody);
        const { wordCount, estimatedReadTime } = getReadingStats(post.postBody);

        return (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div>
              <p>{post.title}</p>
              <p>{postPreviewText}</p>
              <p>{post.category.title}</p>
              <p>{wordCount} words. | {estimatedReadTime} minutes.</p>
              <p>{new Date(post.createdAt).toDateString()}</p>
              
            </div>
          </Link>
        );
      })}
    </>
  );
};

export { BlogPosts };
