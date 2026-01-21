import styles from "./Navbar.module.css";
import { House } from "lucide-react";
import { Link } from "react-router";
import { Moon } from "lucide-react";
import { useState } from "react";
import { Sun } from "lucide-react";
import { useEffect } from "react";
import { Logout } from "../Logout/Logout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        setIsUserLoggedIn(false);
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <House />
        <p>Notes</p>
      </div>

      <div className={styles.navbarlinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isUserLoggedIn ? <Logout setIsUserLoggedIn={setIsUserLoggedIn}/> : <Link to="/login">Log in</Link>}
        {!isUserLoggedIn && <Link to="/register">Register</Link>}
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
