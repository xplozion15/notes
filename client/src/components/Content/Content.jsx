import styles from "./Content.module.css";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className={styles.content}>

      <Outlet />
    </div>
  );
};

export { Content };
