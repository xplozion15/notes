import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostPreview } from "../../utils/postPreview";
import { getReadingStats } from "../../utils/readingStats";
import { Book } from "lucide-react";
import { Calendar } from "lucide-react";
import styles from "./BlogPosts.module.css";

const BlogPosts = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [API_BASE_URL]);

  //check loading state to show loading posts/noposts found
  if (isLoading) {
    return <p className={styles.loading}>Loading posts...</p>;
  }
  if (posts.length === 0) {
    return <p className={styles.empty}>No posts found...</p>;
  }

  return (
    <>
      {posts.map((post) => {
        const postPreviewText = getPostPreview(post.postBody);
        const { wordCount, estimatedReadTime } = getReadingStats(post.postBody);

        return (
          <div className={styles.blogpost} key={post.id}>
            <div className={styles.linkcontent}>
              <Link
                to={`/posts/${post.id}`}
                className={styles.titleLink}
                viewTransition
              >
                <p className={styles.blogtitle}>{post.title}</p>
              </Link>

              <div className={styles.dateAndCategoryDiv}>
                <div className={styles.dateDiv}>
                  <Calendar className={styles.dateIcon} />
                  <p>{new Date(post.createdAt).toDateString()}</p>
                </div>
                <div className={styles.categoryDiv}>
                  <Book className={styles.categoryIcon} />
                  <p>{post.category.title}</p>
                </div>
              </div>

              <p
                className={styles.postBody}
                dangerouslySetInnerHTML={{
                  __html: getPostPreview(postPreviewText),
                }}
              ></p>
              <p className={styles.wordsAndMinutesDiv}>
                {wordCount} words | {estimatedReadTime} minutes
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { BlogPosts };
