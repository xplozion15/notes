import { PostsAndCategories } from "../PostsAndCategories/PostsAndCategories";
import {Stats} from "../Stats/Stats";
import { Link } from "react-router-dom";
import styles from "./MainContent.module.css";

const MainContent = () => {
  
   
  return (
    <>
    <main className={styles.main}>
       <h1 className={styles.adminDashboardHeading}>Admin dashboard</h1>
      <div className={styles.dashboardButtonsDiv}>
        <Link className={styles.dashboardButtons} to="/posts/new">Create post</Link>
        <Link className={styles.dashboardButtons} to="/categories/new">Create category</Link>
      </div>
      <Stats/>
      <PostsAndCategories />
      
    </main>
     
    </>

  );
};

export { MainContent };


