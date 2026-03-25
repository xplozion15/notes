const { prisma } = require("../lib/prisma");

async function showIndexPage(req, res) {
  try {
    const posts = await prisma.post.findMany();
    const categories = await prisma.category.findMany();

    res.json({
      message: "index page of your blog app",
      categories: categories,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      error: "failed to fetch the data",
    });
  }
}

module.exports = { showIndexPage };
