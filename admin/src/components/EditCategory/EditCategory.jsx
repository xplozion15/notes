import { useParams } from "react-router-dom";

const EditCategory = () => {
  const params = useParams();
  const { categoryId } = params;
  return (
    <>
      <p>edit category number {categoryId}</p>
    </>
  );
};

export { EditCategory };
