const { prisma } = require("../lib/prisma");

async function createPost(req, res) {
  try {
    const title = req.body.title;
    const authorId = Number(req.user.userId); // set by auth middleware
    const categoryId = Number(req.body.categoryId);
    const postBody = req.body.postBody;

    const newPost = await prisma.post.create({
      data: {
        title: title,
        authorId: authorId,
        categoryId: categoryId,
        postBody: postBody,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create the post",
    });
  }
}

async function updatePost(req, res) {
  try {
    const postId = Number(req.params.postId);
    const postBody = req.body.postBody;

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        postBody: postBody,
      },
    });
    res.json({
      message: "post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update the post",
    });
  }
}

async function fetchPostById(req, res) {
  const postId = Number(req.params.postId);

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

async function deletePost(req, res) {
  try {
    const postId = Number(req.params.postId);

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.json({
      message: "post deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed the delete the post",
    });
  }
}

module.exports = { fetchPostById, createPost, updatePost, deletePost };
