import styles from "./CategoryDeleteDialog.module.css";
import { Toaster, toast } from "sonner";
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

      const result = await response.json();
      if (!response.ok) {
        return toast.error(result.message);
      }
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryIdToDelete),
      );
      return;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
   
    }
  }

  return (
    <>
      <dialog
        id="category-delete-dialog"
        ref={categoryDialogRef}
        className={styles.deleteModal}
      >
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
          <button
            onClick={categoryDeleteHandler}
            className={styles.deleteButton}
          >
            Yes
          </button>
        </div>
      </dialog>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--background-color-main)",
            color: "var(--text-color-main)",
            border: "2px solid var(--background-color-main)",
            borderRadius: "var(--border-radius-small)",
          },
        }}
      />
    </>
  );
};

export { CategoryDeleteDialog };
