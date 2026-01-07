import styles from "./Content.module.css";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div>
        <h1>this is content component</h1>
        <Outlet />
      </div>
    </>
  );
};

export { Content };
