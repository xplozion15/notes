import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { House } from "lucide-react";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loginHandler(e) {
    e.preventDefault();
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

      navigate("/"); //home page redirect
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
