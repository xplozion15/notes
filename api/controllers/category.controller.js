const { prisma } = require("../lib/prisma");

async function fetchCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return res.json({
      message: "Categories fetched successfulyy",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch the categories",
    });
  }
}

async function createNewCategory(req, res) {
  try {
    const { title } = req.body;

    await prisma.category.create({
      data: {
        title: title,
      },
    });
    res.json({
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create a category",
    });
  }
}

async function fetchPostsByCategory(req, res) {
  try {
    const categoryId = Number(req.params.categoryId);
    const categoryPosts = await prisma.post.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
    });

    res.json({
      categoryPosts: categoryPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: "failed to fetch posts by category",
    });
  }
}

module.exports = { fetchPostsByCategory, createNewCategory, fetchCategories };
