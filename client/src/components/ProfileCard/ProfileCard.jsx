import styles from "./ProfileCard.module.css";
import { Github } from "lucide-react";

const ProfileCard = () => {
  return (
    <>
      <div className={styles.profilecard}>
        <img
          src="/public/catplayinguno.jpg"
          alt="profile-pic"
          className={styles.profilepic}
        />
        <h2>Xplozion</h2>
        <p>I like building web applications </p>
      </div>
    </>
  );
};

export { ProfileCard };
