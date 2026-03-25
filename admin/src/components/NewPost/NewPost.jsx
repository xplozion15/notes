import styles from "./NewPost.module.css";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    categoryId: "",
    postBody: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categories = await response.json();
        setCategories(categories.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  async function savePostHandler() {
    //validation for the new post fields
    if (postData.title.trim().length === 0) {
      setErrorMessage("Post title cannot be empty");
      return;
    } else if (
      postData.title.trim().length < 5 ||
      postData.title.trim().length > 90
    ) {
      setErrorMessage("Post title length must be between 5 to 90 characters");
      return;
    } else if (postData.categoryId === "") {
      setErrorMessage("Select a category");
      return;
    } else if (postData.postBody.trim().length === 0) {
      setErrorMessage("Post body must not be empty");
      return;
    }

    //fetch request
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the post");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.newPostContainer}>
        <div className={styles.postInputDiv}>
          <label htmlFor="postTitleInput">TITLE </label>
          <input
            type="text"
            id="postTitleInput"
            className={styles.postTitleInput}
            onChange={(e) => {
              setPostData((prevPost) => {
                return {
                  ...prevPost,
                  title: e.target.value,
                };
              });
            }}
          />
        </div>

        <div className={styles.postInputDiv}>
          <label htmlFor="category">Select Category</label>
          <select
            name="category"
            value={postData.categoryId}
            id="category"
            className={styles.select}
            onChange={(e) => {
              setPostData((prevPost) => {
                return {
                  ...prevPost,
                  categoryId: e.target.value,
                };
              });
            }}
          >
            <option value="">Select category</option>
            {categories.map((category) => {
              return (
                <>
                  <option
                    value={category.id}
                    key={category.id}
                    className={styles.option}
                  >
                    {category.title}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div className={styles.postInputDiv}>
          <label htmlFor="postBody">BODY</label>

          <Editor
            onEditorChange={(postBody) => {
              setPostData((prevPost) => ({ ...prevPost, postBody: postBody }));
            }}
            apiKey={TINY_MCE_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Write your blog here...</p>"
            init={{
              height: 500,
              width: "99%",
              menubar: false,
              skin: "oxide-dark",

              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:1rem; background-color:#2a323c;color:white;  }",
            }}
          />
          {errorMessage !== "" && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <div className={styles.newPostButtonsContainer}>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </button>

            <button onClick={savePostHandler}>Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { NewPost };
