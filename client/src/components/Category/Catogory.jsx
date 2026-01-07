import { useParams } from "react-router-dom";

const Category = () => {
  const { categoryId } = useParams();

  return (
    <>
      <h1>
        Posts from the category --- <i>{categoryId}</i>
      </h1>
    </>
  );
};

export { Category };
