import styles from "./NewPost.module.css";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NewPost = () => {
  const editorRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [currentCategory,setCurrentCategory] = useState(null);

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

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

  return (
    <>
      <div className={styles.newPostContainer}>
        <div className={styles.postInputDiv}>
          <label htmlFor="postTitle">TITLE </label>
          <input
            type="text"
            id="postTitleInput"
            className={styles.postTitleInput}
          />
        </div>

        <div className={styles.postInputDiv}>
          <label htmlFor="category">Select Category</label>
          <select name="category" id="category" className={styles.select} onChange={(e)=>{
            console.log(e.target.value);
            setCurrentCategory(e.target.value);
          }}>
            {categories.map((category) => {
              return (
                <>
                  <option value={category.title} key={category.id} className={styles.option}>
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
          <div className={styles.newPostButtonsContainer}>
            <button>Cancel</button>
            <button>Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { NewPost };
