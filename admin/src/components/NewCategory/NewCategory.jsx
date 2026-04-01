import styles from "./NewCategory.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function saveCategory() {
    //validation logic for the title input on frontend
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      console.log("lengh is 0 ");
      setErrorMessage("Title should not be empty");
      return;
    } else if (trimmedTitle.length > 14) {
      setErrorMessage("Title length should be less than 14 characters");
      return;
    }

    //try catch block for api request and state changes for new renders
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ title: title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create the category");
      }

      const result = await response.json();
      navigate("/", { viewTransition: true });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.newCategoryContainer}>
        <div className={styles.inputDiv}>
          <label htmlFor="newCategory">New Category Name?</label>
          <input
            id="newCategory"
            name="newCategory"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button onClick={saveCategory}>Save</button>
      </div>
    </>
  );
};

export { NewCategory };
