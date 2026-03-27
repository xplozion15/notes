import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>ERROR 404</h1>
      <p className={styles.message}>Page not found</p>
      <a href="/" className={styles.link}>Go back</a>
    </div>
  );
};

export { Error404 };