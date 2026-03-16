import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.aboutMeDiv}>
        <p>
          Hi, I’m Xplozion. I’m learning to become a web developer and I enjoy
          building websites that are simple, easy to use, and look good. I like
          turning ideas into real projects using clean code and straightforward
          designs.
        </p>

        <p>
          Right now, I’m working on small projects to improve my front-end and
          full-stack skills. These projects help me understand the basics of web
          development, learn new tools, and practice good coding habits. I enjoy
          trying new technologies, experimenting with design, and solving
          problems with code. I also like sharing what I learn and the
          challenges I face because it helps me remember and can help others who
          are learning too.
        </p>

        <img
          src="./about_image.jpg"
          alt="about_image_computer"
          className={styles.computerImage}
        />

        <p>
          My goal is to get my first internship or junior developer role, where
          I can work on real projects, learn from experienced developers, and
          grow as a software engineer.
        </p>
      </div>
    </>
  );
};

export { About };
