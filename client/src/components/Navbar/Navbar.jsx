import styles from "./Navbar.module.css";
import { House } from "lucide-react";
import { Link } from "react-router";
import { Moon } from "lucide-react";
import { useRef, useState } from "react";
import { Sun } from "lucide-react";
import { useEffect } from "react";
import { Logout } from "../Logout/Logout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchInput("");
      setShowSearch(false);
    } else {
      console.log("search element was clicked");
    }
  };

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

  useEffect(() => {
    const applyTheme = () => {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    };

    document.startViewTransition(() => {
      applyTheme();
    });
  }, [theme]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const searchRef = useRef(null);

  useEffect(() => {
    const searchPostsByWord = async () => {
      try {
        const responseOfPosts = fetch(`${API_BASE_URL}/posts/search`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!responseOfPosts.ok) {
          throw new Error("Failed to search the posts");
        }

        const result = responseOfPosts.json().posts;
        setSearchedPosts(result);
      } catch (error) {
        console.log(error);
      }
    };

    searchPostsByWord();
  }, [searchInput]);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <House />
        <p>Notes</p>
      </Link>

      <div className={styles.navbarlinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isUserLoggedIn ? (
          <Logout setIsUserLoggedIn={setIsUserLoggedIn} />
        ) : (
          <Link to="/login">Log in</Link>
        )}
        {!isUserLoggedIn && <Link to="/register">Register</Link>}
      </div>

      <div className={styles.navbaractions}>
        <div ref={searchRef}>
          <input
            type="search"
            name="search"
            id="search"
            value={searchInput}
            className={styles.search}
            placeholder=" Search blogs..."
            onChange={(e) => {
              setShowSearch(true);
              setSearchInput(e.target.value);
            }}
          />

          {showSearch && (
            <div className={styles.searchContainer}>
              <p>this is a search container</p>
            </div>
          )}
        </div>

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
