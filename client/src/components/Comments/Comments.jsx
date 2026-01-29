import styles from "./Comments.module.css";
import { Send } from "lucide-react";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments, postId, userId }) => {
  const [commentInput, setCommentInput] = useState("");

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

      const updatedCommentsData = await commentsResponse.json();

      setComments(updatedCommentsData.comments);
      setCommentInput("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  }

  return (
    <>
      <div className={styles.commentContainer}>
        <p>Comments ({comments.length})</p>
        <div className={styles.postComments}>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>{comment.user.firstName}</p>
                <p>{new Date(comment.createdAt).toDateString()}</p>
                <p>{comment.commentBody}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.commentInputDiv}>
          <textarea
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            name="comment"
            className={styles.comment}
            cols={"100"}
            rows={"5"}
          ></textarea>
          <button
            className={styles.sendCommentButton}
            onClick={sendCommentHandler}
          >
            <Send />
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export { Comments };
