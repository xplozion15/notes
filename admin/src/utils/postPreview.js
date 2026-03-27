const getPostPreview = (postBody) => {
  console.log(postBody);
  return (
    postBody
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .slice(0, 50) + "..."
  );
};

export { getPostPreview };
