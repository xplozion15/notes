import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("jwtToken");
    setIsUserLoggedIn(false);
    navigate("/");
  }

  return (
    <>
      <button className={styles.button} onClick={logoutHandler}>Log Out</button>
    </>
  );
};

export { Logout };
