import styles from "./Comments.module.css";
import { useEffect, useRef, useState } from "react";
import { CommentDeleteDialog } from "../CommentDeleteDialog/CommentDeleteDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments }) => {
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
        console.log(error);
      }
    }
    openOrCloseCommentDeleteDialog();
  }, [showCommentDeleteDialog]);

  return (
    <>
      <CommentDeleteDialog
        setShowCommentDeleteDialog={setShowCommentDeleteDialog}
        commentDeleteDialogRef={commentDeleteDialogRef}
        commentToDelete={commentToDelete}
        setComments={setComments}
      />

      <div className={styles.commentContainer}>
        <p className={styles.commentHeading}>Comments ({comments.length})</p>
        <div className={styles.postComments}>
          {comments.map((comment) => {
            return (
              <>
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.firstNameDateDeleteDiv}>
                    <p className={styles.firstName}>{comment.user.firstName}</p>
                    <p className={styles.datePosted}>
                      {new Date(comment.createdAt).toDateString()}
                    </p>
                  </div>
                  <p className={styles.commentBody}>{comment.commentBody} </p>

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
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Comments };
