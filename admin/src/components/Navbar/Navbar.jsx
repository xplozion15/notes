import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Notes</Link>

      <Link to="/login">Login</Link>
    </nav>
  );
};

export { Navbar };
