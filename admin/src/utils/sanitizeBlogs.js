import DOMPurify from "dompurify";

function sanitizeBlogs(postBody) {
  const sanitizedPostBody = DOMPurify.sanitize(postBody, {
    USE_PROFILES: { html: true },
  });

  return sanitizedPostBody;
}

export { sanitizeBlogs };
