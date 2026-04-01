import styles from "./Comments.module.css";
import { Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CommentDeleteDialog } from "../CommentDeleteDialog/CommentDeleteDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments, postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [showCommentDeleteDialog, setShowCommentDeleteDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState({});
  const commentDeleteDialogRef = useRef(null);

  useEffect(() => {
    async function openOrCloseCommentDeleteDialog() {
      try {
        if (showCommentDeleteDialog) {
          commentDeleteDialogRef.current?.showModal();
        } else {
          commentDeleteDialogRef.current?.close();
        }
      } catch (error) {
        console.error(error);
      }
    }
    openOrCloseCommentDeleteDialog();
  }, [showCommentDeleteDialog]);

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

        const user = await response.json();
        if (response.status === 200) {
          setCurrentUserId(user.id);
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
    // Frontend validation
    if (!commentInput || commentInput.trim().length === 0) {
      setIsError(true);
      setError("Comment cannot be empty");
      return;
    } else if (commentInput.length > 500) {
      setIsError(true);
      setError("Comment cannot exceed 500 characters");
      return;
    }

    //try catch block to send the comment
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await fetch(`${API_BASE_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          comment: commentInput,
          postId: postId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsError(true);
        setError(result.message);
        return;
      }

      // if the fetch api call is succesful to send the post then make an api call to get all comments of the post to refetch the comments
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

      setIsError(false);
      setComments(updatedCommentsData.comments);
      setCommentInput("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CommentDeleteDialog
        setShowCommentDeleteDialog={setShowCommentDeleteDialog}
        commentDeleteDialogRef={commentDeleteDialogRef}
        commentToDelete={commentToDelete}
        setComments={setComments}
      />

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
            {isError && <p className={styles.errorText}>{error}</p>}
            <button
              className={styles.sendCommentButton}
              onClick={sendCommentHandler}
            >
              <Send />
              Send
            </button>
          </div>
        ) : (
          <p className={styles.loginPrompt}>
            Please
            <Link className={styles.loginLink} to="/login" viewTransition>
              login
            </Link>
            to write a comment.
          </p>
        )}

        <p className={styles.commentHeading}>Comments ({comments.length})</p>
        <div className={styles.postComments}>
          {comments.map((comment) => {
            return (
              
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.firstNameDateDeleteDiv}>
                    <p className={styles.firstName}>{comment.user.firstName}</p>
                    <p className={styles.datePosted}>
                      {new Date(comment.createdAt).toDateString()}
                    </p>
                  </div>
                  <p className={styles.commentBody}>{comment.commentBody} </p>
                  {comment.userId === currentUserId && (
                    <button
                      className={styles.deleteComment}
                      onClick={() => {
                        setShowCommentDeleteDialog(true);
                        setCommentToDelete({
                          commentId: comment.id,
                          postId: comment.postId,
                        });
                      }}
                    >
                      delete
                    </button>
                  )}
                </div>
             
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Comments };
