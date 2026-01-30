import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <>
      <div className={styles.profilecard}>
        <img
          src="/public/catplayinguno.jpg"
          alt="profile-pic"
          className={styles.profilepic}
        />
        <h2 className={styles.name}>Xplozion</h2>
        <p className={styles.shortDescription}>I like building web applications </p>
      </div>
    </>
  );
};

export { ProfileCard };
