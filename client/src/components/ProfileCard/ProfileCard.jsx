import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <>
      <div className={styles.profilecard}>
        <img
          src="/cat_avatar.png"
          alt="cat_avatar"
          className={styles.profilepic}
        />
        <h2 className={styles.name}>Xplozion</h2>
        <p className={styles.shortDescription}>I love building web apps!</p>
      </div>
    </>
  );
};

export { ProfileCard };
