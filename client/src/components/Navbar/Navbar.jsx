import styles from "./Navbar.module.css";
import { House } from "lucide-react";
import { Link } from "react-router";
import { Moon } from "lucide-react";
import { useRef, useState } from "react";
import { Sun } from "lucide-react";
import { useEffect } from "react";
import { Logout } from "../Logout/Logout";
import { Menu } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showNavbarLinks, setShowNavbarLinks] = useState(false);

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
    const timer = setTimeout(() => {
      const searchPostsByWord = async () => {
        try {
          const responseOfPosts = await fetch(
            `${API_BASE_URL}/posts/search?word=${encodeURIComponent(searchInput)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!responseOfPosts.ok) {
            throw new Error("Failed to search the posts");
          }

          const data = await responseOfPosts.json();
          const result = data.posts;

          setSearchedPosts(result);
        } catch (error) {
          console.log(error);
        }
      };

      searchPostsByWord();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo} viewTransition>
        <House className={styles.houseIcon} />
        <p>Notes</p>
      </Link>

      <div
        className={`${styles.navbarlinks} ${
          showNavbarLinks ? styles.active : ""
        }`}
      >
        <Link
          to="/"
          className={styles.navbarlinksitem}
          onClick={() => {
            setShowNavbarLinks(!showNavbarLinks);
          }}
          viewTransition
        >
          Home
        </Link>
        <Link
          to="/about"
          className={styles.navbarlinksitem}
          onClick={() => {
            setShowNavbarLinks(!showNavbarLinks);
          }}
          viewTransition
        >
          About
        </Link>
        {isUserLoggedIn ? (
          <Logout
            setIsUserLoggedIn={setIsUserLoggedIn}
            setShowNavbarLinks={setShowNavbarLinks}
            showNavbarLinks={showNavbarLinks}
            viewTransition
          />
        ) : (
          <Link
            to="/login"
            className={styles.navbarlinksitem}
            onClick={() => {
              setShowNavbarLinks(!showNavbarLinks);
            }}
            viewTransition
          >
            Login
          </Link>
        )}
        {!isUserLoggedIn && (
          <Link
            to="/register"
            className={styles.navbarlinksitem}
            onClick={() => {
              setShowNavbarLinks(!showNavbarLinks);
            }}
            viewTransition
          >
            Register
          </Link>
        )}
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
              {searchedPosts.length === 0 && <p>No results found...</p>}
              {searchedPosts.map((post) => {
                return (
                  <Link
                    onClick={() => {
                      setShowSearch(false);
                    }}
                    to={`/posts/${post.id}`}
                    key={post.id}
                    className={styles.searchInstance}
                    viewTransition
                  >
                    {post.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {theme === "light" ? (
          <button
          className={styles.iconButtons}
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon className={styles.moonIcon} />
          </button>
        ) : (
          <button className={styles.iconButtons}
            onClick={() => {
              setTheme("light");
            }}
          >
            <Sun className={styles.sunicon} />
          </button>
        )}
        <Menu
          className={styles.menuIcon}
          onClick={() => {
            // toggle showNavbarLinks state
            setShowNavbarLinks(!showNavbarLinks);
          }}
        />
      </div>
    </nav>
  );
};

export { Navbar };
