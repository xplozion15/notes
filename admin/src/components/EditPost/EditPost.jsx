import styles from "./EditPost.module.css";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    categoryId: "",
    postBody: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  //get the post Id from use params react router method
  let params = useParams();
  const postId = params.postId;

  // useeffect to get the post data to display post title,body and category of the post to be edited
  useEffect(() => {
    async function fetchPostData() {
      try {
        const postResponse = await fetch(`${API_BASE_URL}/posts/${postId}`);

        if (!postResponse.ok) {
          throw new Error("Failed to fetch the post data");
        }
        const postData = await postResponse.json();
        setPostData({
          title: postData.post.title,
          categoryId: postData.post.category.id,
          postBody: postData.post.postBody,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchPostData();
  }, [postId]);

  // useeffect to get the categories data to display it in the select >> options tag dropdown
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

  // function to run when save is clicked
  async function updatePostHandler() {
    //validation for the update post inputs
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
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message);
        return;
      }

      navigate(`/posts/${postId}`, { viewTransition: true });
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.log(error);
    }
  }
  console.log(postData);
  return (
    <>
      <div className={styles.editPostContainer}>
        <div className={styles.postInputDiv}>
          <label htmlFor="postTitle">TITLE </label>
          <input
            value={postData.title}
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
            value={postData.postBody}
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

          <p className={styles.errorMessage}>{errorMessage}</p>

          <div className={styles.updatePostButtonsContainer}>
            <button
              onClick={() => {
                navigate("/", { viewTransition: true });
              }}
            >
              Cancel
            </button>
            <button onClick={updatePostHandler} className={styles.updateButton}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditPost };
