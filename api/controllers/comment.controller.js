const { prisma } = require("../lib/prisma");

async function addCommentToPost(req, res) {
  console.log(req.body);
  try {
    const postId = Number(req.body.postId);
    const comment = req.body.comment;
    const userId = Number(req.body.userId); // set by auth middleware
    console.log(
      `post id is ${postId}, comment is ${comment} , userid is ${userId}`,
    );
    await prisma.comment.create({
      data: {
        commentBody: comment,
        postId: postId,
        userId: userId,
      },
    });

    res.json({
      message: "Comment succesfully posted",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}

async function deleteComment(req, res) {
  try {
    const commentId = Number(req.params.commentId);
    if (commentId) {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      res.json({
        message: "comment deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the comment",
    });
  }
}

async function updateComment(req, res) {
  try {
    const commentId = Number(req.params.commentId);
    const commentBody = req.body.comment;

    if (commentId) {
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          commentBody: commentBody,
        },
      });
    }
    res.json({
      message: "comment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update the comment",
    });
  }
}

module.exports = { addCommentToPost, deleteComment, updateComment };
