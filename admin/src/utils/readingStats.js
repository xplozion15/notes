const getReadingStats = (postBody) => {
  const wordCount = postBody.trim().split(/\s+/).length;
  const estimatedReadTime = Math.ceil(wordCount / 200); // 200 wpm avg is standard speed of reading

  return {
    wordCount,
    estimatedReadTime,
  };
};

export { getReadingStats };
