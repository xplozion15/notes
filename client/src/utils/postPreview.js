const getPostPreview = (postBody) => {
  const previewLength = 50;
  return postBody.slice(0, previewLength) + ". . .";
};

export { getPostPreview };
