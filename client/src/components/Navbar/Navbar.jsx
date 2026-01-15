import styles from "./Navbar.module.css";
import { House } from "lucide-react";
import { Link } from "react-router";
import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <House />
        <p>Notes</p>
      </div>

      <div className={styles.navbarlinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser ? (
          <Link to="/login" onClick={() => setCurrentUser(null)}>
            Log out
          </Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>

      <div className={styles.navbaractions}>
        <input
          type="search"
          name="search"
          id="search"
          className={styles.search}
          placeholder=" Search blogs..."
        />
        {theme === "light" ? (
          <Moon
            onClick={() => {
              setTheme("dark");
            }}
          />
        ) : (
          <Sun
            className={styles.sunicon}
            onClick={() => {
              setTheme("light");
            }}
          />
        )}
      </div>
    </nav>
  );
};

export { Navbar };
