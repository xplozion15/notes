import { useState, useEffect, useRef } from "react";
import styles from "./PostsAndCategories.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Link } from "react-router-dom";
import { getPostPreview } from "../../utils/postPreview";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";
import { Trash } from "lucide-react";
import { CategoryDeleteDialog } from "../CategoryDeleteDialog/CategoryDeleteDialog";
import { SquarePen } from "lucide-react";

const PostsAndCategories = () => {
  const [activeStatus, setActiveStatus] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const dialogRef = useRef(null);
  const categoryDialogRef = useRef(null);

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
                <p className={styles.postBody}>
                  {getPostPreview(post.postBody)}
                </p>
                <div className={styles.dateDiv}>
                  <p>{new Date(post.createdAt).toDateString()}</p>
                </div>
                <div className={styles.buttonsDiv}>
                  <Link to={`posts/${post.id}`} className={styles.buttons}>Read more</Link>
                  <Link className={styles.buttons}>Edit</Link>
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
              <>
                <div className={styles.categoryDiv}>
                  {editingCategoryId === category.id ? (
                    <input type="text" value={category.title} />
                  ) : (
                    <p
                      className={styles.category}
                      onClick={() => setEditingCategoryId(category.id)}
                    >
                      {category.title}
                    </p>
                  )}
                  {editingCategoryId !== category.id && (
                    <>
                      <button
                        onClick={() => {
                          setEditingCategoryId(category.id);
                        }}
                      >
                        <SquarePen />
                      </button>

                      <button
                        onClick={() => {
                          setShowCategoryDeleteModal(true);
                          setCategoryIdToDelete(category.id);
                        }}
                      >
                        <Trash />
                      </button>
                    </>
                  )}
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export { PostsAndCategories };
