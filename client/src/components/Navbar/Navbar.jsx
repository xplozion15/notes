import styles from "./Navbar.module.css";
import { House } from "lucide-react";
import { Link } from "react-router";
import { Moon } from "lucide-react";
import { useState } from "react";
import { Sun } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <House />
        <p>Notes</p>
      </div>

      <div className={styles.navbarlinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Log in</Link>
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
