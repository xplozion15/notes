import styles from "./NewCategory.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function saveCategory() {
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
      navigate("/");
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
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        
        <button
          onClick={saveCategory}
        >
          Save
        </button>
      </div>
    </>
  );
};

export { NewCategory };
