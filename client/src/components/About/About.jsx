import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.aboutMeDiv}>
        <img
          src="./computer.webp"
          alt="computer"
          className={styles.computerImage}
        />
        <p>
          Hi, I’m Xplozion, an aspiring Web Developer passionate about building
          modern, responsive, and user-focused web applications. I enjoy turning
          ideas into real-world products using clean code, intuitive design, and
          scalable architecture. I’m currently focused on sharpening my
          front-end and full-stack development skills by working on hands-on
          projects that reflect real industry use cases. Through these projects,
        </p>

        <p>
          I aim to strengthen my understanding of web fundamentals, modern
          frameworks, and best practices in software development. I love
          learning new technologies, experimenting with UI/UX improvements, and
          solving problems through code. Writing about my journey, challenges,
          and learnings helps me solidify my knowledge and share insights with
          others who are on a similar path.
        </p>
        <p>
          My goal is to secure my first internship or entry-level developer
          role, where I can contribute to meaningful projects, learn from
          experienced developers, and grow into a well-rounded software
          engineer.
        </p>
        
      </div>
    </>
  );
};

export { About };
