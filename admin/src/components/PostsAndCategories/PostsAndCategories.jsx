import { useState, useEffect, useRef } from "react";
import styles from "./PostsAndCategories.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Link } from "react-router-dom";
import { getPostPreview } from "../../utils/postPreview";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";
import { CategoryDeleteDialog } from "../CategoryDeleteDialog/CategoryDeleteDialog";
import { Toaster, toast } from "sonner";

const PostsAndCategories = () => {
  const [activeStatus, setActiveStatus] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const [editingCategoryData, setEditingCategoryData] = useState({
    id: null,
    title: "",
  });

  const dialogRef = useRef(null);
  const categoryDialogRef = useRef(null);
  const editCategoryInputRef = useRef(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);

        if (!response.ok) {
          throw new Error("Failed to fetch the posts");
        }

        const posts = await response.json();
        setPosts(posts.posts);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);

        if (!categoriesResponse.ok) {
          throw new Error("failed to fetch categories");
        }

        const categories = await categoriesResponse.json();
        setCategories(categories.categories);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function openOrCloseDeleteDialog() {
      try {
        if (showDeleteModal) {
          dialogRef.current?.showModal();
        } else {
          dialogRef.current?.close();
        }
      } catch (error) {
        console.log(error);
      }
    }
    openOrCloseDeleteDialog();
  }, [showDeleteModal]);

  useEffect(() => {
    async function openOrCloseCategoryDeleteDialog() {
      try {
        if (showCategoryDeleteModal) {
          categoryDialogRef.current?.showModal();
        } else {
          categoryDialogRef.current?.close();
        }
      } catch (error) {
        console.log(error);
      }
    }
    openOrCloseCategoryDeleteDialog();
  }, [showCategoryDeleteModal]);

  async function updateCategoryHandler() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/${editingCategoryData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            categoryId: editingCategoryData.id,
            categoryTitle: editingCategoryData.title,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        //show toast
        toast.error(result.message);
        return;
      }

      //set categories state if request is succesful so that the ui will be updated
      const updatedCategory = categories.map((category) => {
        if (category.id !== editingCategoryData.id) {
          return category;
        } else if (category.id === editingCategoryData.id) {
          return {
            ...category,
            title: editingCategoryData.title,
          };
        }
      });
      console.log(updatedCategory);
      //set the category
      setCategories(updatedCategory);

      //also reset editing category data state to avoid input element being displayed on re-render
      setEditingCategoryData({
        id: "",
        title: "",
      });
    } catch (error) {
      //show toast
      toast.error("Something went wrong");
      //to update the ui
      setEditingCategoryData({
        id: "",
        title: "",
      });
      console.log(error);
    }
  }

  console.log(categories);
  return (
    <>
      <DeleteDialog
        setShowDeleteModal={setShowDeleteModal}
        dialogRef={dialogRef}
        postIdToDelete={postIdToDelete}
        setPosts={setPosts}
      />

      <CategoryDeleteDialog
        setShowCategoryDeleteModal={setShowCategoryDeleteModal}
        categoryDialogRef={categoryDialogRef}
        categoryIdToDelete={categoryIdToDelete}
        setCategories={setCategories}
      />

      <div className={styles.activityDiv}>
        <button
          className={`${styles.tab} ${activeStatus === "posts" ? styles.posts : ""}`}
          onClick={() => {
            setActiveStatus("posts");
          }}
        >
          Posts
        </button>
        <button
          className={`${styles.tab} ${activeStatus === "categories" ? styles.categories : ""}`}
          onClick={() => {
            setActiveStatus("categories");
          }}
        >
          Categories
        </button>
      </div>

      {activeStatus === "posts" && (
        <div>
          {posts.map((post) => {
            return (
              <div key={post.id} className={styles.post}>
                <p className={styles.postTitle}>{post.title}</p>
                <p
                  className={styles.postBody}
                  dangerouslySetInnerHTML={{
                    __html: getPostPreview(post.postBody),
                  }}
                ></p>

                <div className={styles.dateDiv}>
                  <p>{new Date(post.createdAt).toDateString()}</p>
                </div>
                <div className={styles.buttonsDiv}>
                  <Link
                    to={`posts/${post.id}`}
                    className={styles.buttons}
                    viewTransition
                  >
                    Read
                  </Link>
                  <Link
                    to={`posts/${post.id}/edit`}
                    className={styles.buttons}
                    viewTransition
                  >
                    Edit
                  </Link>
                  <button
                    className={styles.deletePostButton}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setPostIdToDelete(post.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {activeStatus === "categories" && (
        <div>
          {categories.map((category) => {
            return (
              <div className={styles.categoryDiv} key={category.id}>
                {editingCategoryData.id === category.id ? (
                  <input
                    className={styles.editCategoryInput}
                    type="text"
                    value={editingCategoryData.title}
                    onChange={(e) => {
                      setEditingCategoryData({
                        ...editingCategoryData,
                        title: e.target.value,
                      });
                    }}
                    onBlur={updateCategoryHandler}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        updateCategoryHandler();
                      }
                    }}
                    ref={editCategoryInputRef}
                  />
                ) : (
                  <p
                    className={styles.category}
                    onClick={() => {
                      setEditingCategoryData({
                        ...editingCategoryData,
                        id: category.id,
                      });
                    }}
                  >
                    {category.title}
                  </p>
                )}
                {editingCategoryData.id !== category.id && (
                  <>
                    <div className={styles.categoryButtonsDiv}>
                      <button
                        className={styles.categoryButtons}
                        onClick={() => {
                          //set the editing category data
                          setEditingCategoryData({
                            ...editingCategoryData,
                            id: category.id,
                            title: category.title,
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className={`${styles.categoryButtons} ${styles.categoryDeleteButton}`}
                        onClick={() => {
                          setShowCategoryDeleteModal(true);
                          setCategoryIdToDelete(category.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
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

export { PostsAndCategories };
