import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <div>
        <Link to="/posts">Posts</Link>
        <Link to="/categories">Categories</Link>
      </div>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export { Navbar };
