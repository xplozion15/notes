import styles from "./NewPost.module.css";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;

const NewPost = () => {
  const editorRef = useRef(null);
  
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

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
           
            <button>Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { NewPost };
