const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const sanitizeBlogs = (postBody) => {
  const sanitizedPostBody = DOMPurify.sanitize(postBody, {
    USE_PROFILES: { html: true },
  });

  return sanitizedPostBody;
};

module.exports = { sanitizeBlogs };
