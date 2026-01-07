import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className={styles.loginFormContainer}>
        <form action="" method="post" className={styles.loginForm}>
          <h2>Login Form</h2>
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
          <Link to="/">Create New Account</Link>
        </form>
      </div>
    </>
  );
};

export { Login };
