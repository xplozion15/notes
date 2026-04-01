import styles from "./DeleteDialog.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DeleteDialog = ({
  setShowDeleteModal,
  dialogRef,
  postIdToDelete,
  setPosts,
}) => {
  async function deleteHandler() {
    setShowDeleteModal(false);

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the posts");
      }
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postIdToDelete),
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <dialog id="delete-dialog" ref={dialogRef} className={styles.deleteModal}>
        <p>Are you sure you want to delete this post?</p>
        <div className={styles.buttonsDiv}>
          <button
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            No
          </button>
          <button onClick={deleteHandler} className={styles.deleteButton}>
            Yes
          </button>
        </div>
      </dialog>
    </>
  );
};

export { DeleteDialog };
