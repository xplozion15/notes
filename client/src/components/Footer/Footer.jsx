import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <a className={styles.attribution} target="_blank" href="https://www.flaticon.com/free-icons/blog" title="blog icons">Blog icons created by Freepik - Flaticon</a>
        <p>© 2025 Xplozion. </p>
      </div>
    </>
  );
};

export { Footer };
