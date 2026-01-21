import styles from "./Comments.module.css";
import { Send } from "lucide-react";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments, postId, userId }) => {
  
  async function sendCommentHandler() {
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      console.log(`${commentInput},${postId},${userId}`);

      const response = await fetch(`${API_BASE_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          comment: commentInput,
          postId: postId,
          userId: userId,
        }),
      });
     
   
      
      
      if (!response.ok) throw new Error("Failed to post comment");
      
      const newComment = await response.json();
      console.log(`new comment is ${newComment}`);

      setComments([...comments, newComment]);

      setCommentInput("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  }

  const [commentInput, setCommentInput] = useState("");

  return (
    <>
      <div className={styles.commentContainer}>
        <div className={styles.postComments}>
          {comments.map((comment) => {
            <p key={comment.id}>{comment.commentBody}</p>;
          })}
        </div>

        <div className={styles.commentInputDiv}>
          <textarea
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            name="comment"
            className={styles.comment}
            cols={"100"}
            rows={"5"}
          ></textarea>
          <button
            type="button"
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
