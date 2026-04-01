import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { House } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo} viewTransition>
        <House /> Notes
      </Link>

      <Link
        to="/login"
        onClick={() => {
          localStorage.removeItem("jwtToken");
        }}
        viewTransition
      >
        Logout
      </Link>
    </nav>
  );
};

export { Navbar };
