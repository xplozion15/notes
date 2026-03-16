const getPostPreview = (postBody) => {
  return postBody.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").slice(0, 50) + "...";
};

export { getPostPreview };
