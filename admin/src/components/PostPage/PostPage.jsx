import { useParams } from "react-router-dom";
// import styles from "./PostPage.module.css"

const PostPage = () => {
  const params = useParams();
  const postId = params.postId;
  return (
    <>
      <p> this is a post page {postId}</p>
    </>
  );
};

export { PostPage };
