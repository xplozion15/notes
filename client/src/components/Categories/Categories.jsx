import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
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
        setError("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  //check loading state to show loading posts/no categories found
  if (isLoading) {
    return <p className={styles.loading}>Loading categories...</p>;
  }
  if (error) {
    return <p className={styles.error}>{error}...</p>;
  }
  if (categoriesArray.length === 0) {
    return <p className={styles.empty}>No Categories found...</p>;
  }

  return (
    <div className={styles.categories}>
      <p className={styles.categoryheading}>Categories</p>
      {categoriesArray.map((category) => (
        <Link
          to={`/categories/${category.id}/posts`}
          key={category.id}
          className={styles.categoryLink}
          viewTransition
        >
          <div className={styles.categorydiv}>
            <p>{category.title}</p>
            <p className={styles.categorycount}>{category["_count"].posts}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export { Categories };
