import styles from "./Comments.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comments = ({ comments, setComments }) => {
  async function deleteCommentHandler(commentId, postId) {
    // calling the api
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const responseOfDelete = await fetch(
        `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            commentId: commentId,
          }),
        },
      );
      if (!responseOfDelete.ok) throw new Error("Failed to delete the comment");

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
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
                      deleteCommentHandler(comment.id, comment.postId);
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
