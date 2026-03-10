const getPostPreview = (postBody) => {
  return postBody.replace(/<[^>]+>/g, "").slice(0, 50) + "...";
};

export { getPostPreview };
