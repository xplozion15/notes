import styles from "./Comments.module.css";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments, postId, userId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const checkAuth = async () => {
        try {
          const jwtToken = localStorage.getItem("jwtToken");
  
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          });
  
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
          console.error("Auth check failed:", error);
        }
      };
  
      checkAuth();
    }, []);

  async function sendCommentHandler() {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      console.log(`${commentInput},${postId},${userId}`);

      const response = await fetch(`${API_BASE_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          comment: commentInput,
          postId: postId,
          userId: userId,
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      // if the fetch api call is succesful then make an api call to get all comments of the post and set it using useState hook

      const commentsResponse = await fetch(
        `${API_BASE_URL}/posts/${postId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (!commentsResponse.ok) throw new Error("Failed to fetch the comments");
      setIsAuthenticated(true);
      const updatedCommentsData = await commentsResponse.json();

      setComments(updatedCommentsData.comments);
      setCommentInput("");
    } catch (error) {
      console.error("Error posting comment", error);
      setIsAuthenticated(false);
    }
  }

  return (
    <>
      <div className={styles.commentContainer}>
        {isAuthenticated ? (
          <div className={styles.commentInputDiv}>
            <textarea
              placeholder="Share your thoughts here"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className={styles.commentTextArea}
              cols="100"
              rows="5"
            />
            <button
              className={styles.sendCommentButton}
              onClick={sendCommentHandler}
              disabled={!commentInput.trim()}
            >
              <Send />
              Send
            </button>
          </div>
        ) : (
          <p className={styles.loginPrompt}>
            Please{" "}
            <Link className={styles.loginLink} to="/login">
              login
            </Link>{" "}
            to write a comment.
          </p>
        )}

        <p className={styles.commentHeading}>Comments ({comments.length})</p>
        <div className={styles.postComments}>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className={styles.comment}>
                <p className={styles.firstName}>{comment.user.firstName}</p>
                <p className={styles.datePosted}>
                  {" "}
                  {new Date(comment.createdAt).toDateString()}
                </p>
                <p className={styles.commentBody}>{comment.commentBody}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Comments };
