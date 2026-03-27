import styles from "./CategoryDeleteDialog.module.css"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CategoryDeleteDialog = ({
  setShowCategoryDeleteModal,
  categoryDialogRef,
  categoryIdToDelete,
  setCategories,
}) => {
  async function categoryDeleteHandler() {
    setShowCategoryDeleteModal(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/${categoryIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`${response.message}`);
      }
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryIdToDelete),
      );
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <dialog id="category-delete-dialog" ref={categoryDialogRef} className={styles.deleteModal}>
        <p>Are you sure you want to delete this category?</p>
        <div className={styles.buttonsDiv}>
          <button
          commandfor="my-dialog"
          command="close"
          onClick={() => {
            setShowCategoryDeleteModal(false);
          }}
        >
          No
        </button>
        <button onClick={categoryDeleteHandler} className={styles.deleteButton}>Yes</button>
        </div>
      </dialog>
    </>
  );
};

export { CategoryDeleteDialog };
