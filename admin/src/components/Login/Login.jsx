import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // to tell where you are currently in the app and find the message passed from admin routes
  const location = useLocation();

  // useEffect to redirect admin users from /login to / root
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken"); // get  the token
    if (!jwtToken) return; // no token then skip

    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!res.ok) return; // invalid token then skip

        const data = await res.json();
        if (data.isAdmin) navigate("/", { viewTransition: true }); // redirect if admin (to the / route)
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkAuth();
  }, [navigate, API_BASE_URL]);

  //useEffect to show the error whenever the state changes which is being received from the admin routes component through <Navigate/>
  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
    }
  }, [location.state]);

  async function loginHandler(e) {
    //prevent default form behaviour
    e.preventDefault();

    //frontend validation of the form
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername.length === 0) {
      setErrorMessage("Username cannot be empty");
      return;
    } else if (trimmedUsername.length < 3 || trimmedUsername.length > 16) {
      setErrorMessage("Username must be 3 to 16 characters only");
      return;
    } else if (trimmedPassword.length === 0) {
      setErrorMessage("Password cannot be empty");
      return;
    } else if (trimmedPassword.length < 3 || trimmedPassword.length > 16) {
      setErrorMessage("Password must be 3 to 16 characters only");
      return;
    }

    //fetch request
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message);
        return;
      }

      const jwtToken = result.token;

      localStorage.setItem("jwtToken", jwtToken);

      navigate("/", { viewTransition: true }); //home page redirect
    } catch (error) {
      setErrorMessage("Please check your network or try again later");
      console.log(error.message);
    }
  }

  return (
    <>
      {/* toast element from npm sonner library */}
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--background-color-main)",
            color: "var(--text-color-main)",
            border: "2px solid var(--background-color-main)",
            borderRadius: "var(--border-radius-small)",
          },
        }}
      />
      <Link to="/" className={styles.logo} viewTransition>
        <p>Home</p>
      </Link>

      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm}>
          <h2 className={styles.h2}>Admin Login Form</h2>
          <div className={styles.formDiv}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={styles.formDiv}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className={styles.error}>{errorMessage}</p>

          <button
            type="submit"
            className={styles.submitLoginButton}
            onClick={loginHandler}
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export { Login };
