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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsById = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/${categoryId}/posts`,
        );
        const result = await response.json();

        if (!response.ok) {
          setError(result.message);
          throw new Error(`Response status: ${response.status}`);
        }
        setPosts(result.categoryPosts);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPostsById();
  }, [categoryId]);

  if (loading)
    return <p className={styles.loadingErrorText}>Posts are loading...</p>;
  if (error) return <p className={styles.loadingErrorText}>{error}</p>;
  if (posts.length === 0)
    return (
      <p className={styles.loadingErrorText}>No posts in this category.</p>
    );
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
                  __html: postPreviewText,
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

export { Category };
