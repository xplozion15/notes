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
        title: title.trim(), 
      },
    });
    res.json({
      message: "Category created successfully",
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    console.error(error);

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
async function deleteCategory(req, res) {
  try {
    // Convert the categoryId from URL params to a number
    const categoryId = Number(req.params.categoryId);

    //Check if the category even exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    //Check if any posts are still using this category
    const postsCount = await prisma.post.count({
      where: { categoryId },
    });

    // dont delete category if posts are there
    if (postsCount > 0) {
      return res.status(400).json({
        message:
          "Cannot delete category because posts are still assigned to it.",
      });
    }

    // delete category
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete category",
    });
  }
}

async function updateCategory(req, res) {
  //get category name and id
   console.log(req.body)
  const categoryTitle = req.body.categoryTitle;
  const categoryId = Number(req.body.categoryId); 
 

  try {
    // find the unique category with id
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    //give error 404 if no category with the id exist
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // update if category exists
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        title: categoryTitle,
      },
    });
    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
}

module.exports = {
  fetchPostsByCategory,
  createNewCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
};
