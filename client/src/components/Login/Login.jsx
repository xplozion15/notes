import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <>
      <div className={styles.loginFormContainer}>
        <form action={`${API_BASE_URL}/auth/login`} method="post" className={styles.loginForm}>
          <h2 className={styles.h2}>Login Form</h2>
          <div className={styles.formDiv}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className={styles.formDiv}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit" className={styles.submitLoginButton}>
            Log in
          </button>
          <Link to="/" className={styles.a}>Create New Account</Link>
        </form>
      </div>
    </>
  );
};

export { Login };
