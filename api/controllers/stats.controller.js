const { prisma } = require("../lib/prisma");

async function fetchStats(req, res) {
  try {
    const postsCount = await prisma.post.count();
    const categoriesCount = await prisma.category.count();

    res.json({
      postsCount: postsCount,
      categoriesCount: categoriesCount,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  fetchStats,
};
