import styles from "./Sidebar.module.css";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { Categories } from "../Categories/Categories";

const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <ProfileCard />
        <Categories />
      </div>
    </>
  );
};

export { Sidebar };
