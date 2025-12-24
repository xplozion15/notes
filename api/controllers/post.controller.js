const { prisma } = require("../lib/prisma");

async function fetchPostById(req, res) {
  const postId = req.params.postId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const postComments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    const categories = await prisma.category.findMany();

    post === null
      ? res.status(404).json({ error: "Post does not exist" })
      : res.json({
          post: post,
          postComments: postComments,
          categories: categories,
        });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch this post",
    });
  }
}

module.exports = { fetchPostById };
