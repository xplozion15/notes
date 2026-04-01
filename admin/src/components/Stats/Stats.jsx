import styles from "./Stats.module.css";
import { useEffect, useState } from "react";

const Stats = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const jwtToken = localStorage.getItem("jwtToken");
  const [postsCount, setPostsCount] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${API_BASE_URL}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the stats");
        }

        const stats = await response.json();
        setPostsCount(stats.postsCount);
        setCategoriesCount(stats.categoriesCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, [API_BASE_URL, jwtToken]);

  return (
    <>
      <div className={styles.stats}>
        <div className={styles.statElement}>
          <p className={styles.statDescription}>Posts</p>
          <p className={styles.number}>{postsCount}</p>
        </div>

        <div className={styles.statElement}>
          <p className={styles.statDescription}>Categories</p>
          <p className={styles.number}>{categoriesCount}</p>
        </div>
      </div>
    </>
  );
};

export { Stats };
