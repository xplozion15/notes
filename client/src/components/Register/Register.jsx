import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";


const Register = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  async function registerHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message);
        return;
      }

    
      navigate("/"); // home page redirect
    } catch (error) {
      setErrorMessage("Please check your network or try again later");
      console.log(error.message);
    }


    


  }

  return (
    <>  
      
      <div className={styles.registerFormContainer}>
        
        <form className={styles.registerForm}>
          <h2 className={styles.h2}>Register Form</h2>

          <div className={styles.formDiv}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formDiv}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formDiv}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formDiv}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formDiv}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className={styles.error}>{errorMessage}</p>

          <button
            type="submit"
            className={styles.submitRegisterButton}
            onClick={registerHandler}
          >
            Create New User
          </button>
        </form>
      </div>
    </>
  );
};

export { Register };
