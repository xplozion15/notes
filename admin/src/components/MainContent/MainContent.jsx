import { PostsAndCategories } from "../PostsAndCategories/PostsAndCategories";
import { Stats } from "../Stats/Stats";
import { Link } from "react-router-dom";
import { UserStar } from "lucide-react";
import styles from "./MainContent.module.css";

const MainContent = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.adminDashboardHeading}>
          <UserStar /> Admin-dashboard{" "}
        </h1>

        <Stats />
        <div className={styles.dashboardButtonsDiv}>
          <Link
            className={styles.dashboardButtons}
            to="/posts/new"
            viewTransition
          >
            Create post
          </Link>
          <Link
            className={styles.dashboardButtons}
            to="/categories/new"
            viewTransition
          >
            Create category
          </Link>
        </div>
        <PostsAndCategories />
      </main>
    </>
  );
};

export { MainContent };
