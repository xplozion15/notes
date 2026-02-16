import { useParams } from "react-router";

const EditPost = () => {
  let params = useParams();
  const { postId } = params;
  return (
    <>
      <p>editing the post - {postId}</p>
    </>
  );
};

export { EditPost };
