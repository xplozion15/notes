import styles from "./commentDeleteDialog.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentDeleteDialog = ({
  setShowCommentDeleteDialog,
  commentDeleteDialogRef,
  commentToDelete,
  setComments,
}) => {
  async function commentDeleteHandler() {
    setShowCommentDeleteDialog(false);
    // calling the api
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const responseOfDelete = await fetch(
        `${API_BASE_URL}/posts/${commentToDelete.postId}/comments/${commentToDelete.commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
      
        },
      );
      if (!responseOfDelete.ok) throw new Error("Failed to delete the comment");

      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.id !== commentToDelete.commentId,
        ),
      );
    } catch (error) {
      console.error(error)
    }
  }

  return (
  
      <dialog
        id="delete-dialog"
        ref={commentDeleteDialogRef}
        className={styles.commentDeleteDialog}
      >
        <p>Are you sure you want to delete this Comment?</p>
        <div className={styles.buttonsDiv}>
          <button
            commandfor="my-dialog"
            command="close"
            onClick={() => {
              setShowCommentDeleteDialog(false);
            }}
          >
            No
          </button>
          <button
            onClick={commentDeleteHandler}
            className={styles.deleteButton}
          >
            Yes
          </button>
        </div>
      </dialog>

  );
};

export { CommentDeleteDialog };
