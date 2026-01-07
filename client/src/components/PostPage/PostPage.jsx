import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();

  return (
    <>
      <p>a single post page of id {postId} </p>
    </>
  );
};

export { PostPage };
