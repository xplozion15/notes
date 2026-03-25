import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PostPage.module.css";
import { Comments } from "../Comments/Comments";
import { Calendars } from "lucide-react";
import { Book } from "lucide-react";
import { getReadingStats } from "../../utils/readingStats";

const PostPage = () => {
  const { postId } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [wordCount, setWordCount] = useState(null);
  const [estimatedReadTime, setEstimatedReadTime] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setPost(result.post);
        setWordCount(getReadingStats(result.post.postBody).wordCount);
        setEstimatedReadTime(
          getReadingStats(result.post.postBody).estimatedReadTime,
        );
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
  }, [API_BASE_URL, postId]);

  if (!post) {
    return <p>loading the post...</p>;
  }

  console.log(post.postBody);
  return (
    <>
      <div className={styles.post}>
        <p className={styles.postTitle}>{post.title}</p>

        <div className={styles.dateAndCategoryDiv}>
          <div className={styles.dateDiv}>
            <Calendars className={styles.dateIcon} />
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>

          <div className={styles.categoryDiv}>
            <Book className={styles.categoryIcon} />
            {post.category && <p>{post.category.title}</p>}
          </div>
        </div>

        <p className={styles.wordsAndMinutesDiv}>
          {wordCount} words | {estimatedReadTime} minutes
        </p>

        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.postBody }}
        />
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
