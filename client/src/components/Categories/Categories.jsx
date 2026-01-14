import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        
        
        setCategoriesArray(result.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className={styles.categories}>
        <p className={styles.categoryheading}>Categories</p>
        {categoriesArray.map((category) => (
          <Link to={`/categories/${category.id}/posts`} key={category.id}>
            <div key={category.id} className={styles.categorydiv}>
              <p>{category.title}</p>
              <p className={styles.categorycount}>{category["_count"].posts}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export { Categories };
