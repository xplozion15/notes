import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState, useEffect } from "react";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect to redirect  users from /login to / root
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
        if (data) navigate("/"); // redirect if its a valid user (to the / route)
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkAuth();
  }, [navigate, API_BASE_URL]);

  async function loginHandler(e) {
    e.preventDefault();

    //frontend validation
    if (!username || username.trim().length === 0) {
      setErrorMessage("Username should not be empty");
      return;
    } else if (!password || password.trim().length === 0) {
      setErrorMessage("Please dont keep the username empty");
      return;
    } else if (username.length < 3 || username.length > 15) {
      setErrorMessage("Username must be between 3 to 15 characters only");
      return;
    } else if (password.length < 3 || password.length > 15) {
      setErrorMessage("Password must be between 3 to 15 characters only");
      return;
    }

    //api request
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

      //set jwttoken to localstorage
      localStorage.setItem("jwtToken", jwtToken);

      //home page redirect
      navigate("/");
    } catch (error) {
      setErrorMessage("Please check your network or try again later");
      console.log(error.message);
    }
  }

  return (
    <>
      <Link to="/" className={styles.logo}>
        <p>Home</p>
      </Link>

      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm}>
          <h2 className={styles.h2}>Login Form</h2>
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
          <Link to="/register" className={styles.a}>
            Create New Account
          </Link>
        </form>
      </div>
    </>
  );
};

export { Login };
