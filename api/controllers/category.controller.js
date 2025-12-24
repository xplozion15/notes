const { prisma } = require("../lib/prisma");

async function fetchPostsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const categoryPosts = await prisma.post.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    res.json({
        categoryPosts:categoryPosts,
    })
  } catch (error) {
    res.status(500).json({
        error : "failed to fetch posts by category",
    }
    )
  }
}


module.exports = {fetchPostsByCategory};