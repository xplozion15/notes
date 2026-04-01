const { prisma } = require("../lib/prisma");
const {  validationResult } = require("express-validator");

async function addCommentToPost(req, res) {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  //try catch block for adding a comment/catching erros
  try {
    const postId = Number(req.body.postId);
    const comment = req.body.comment;
    const userId = req.user.userId; // set by auth middleware

    await prisma.comment.create({
      data: {
        commentBody: comment,
        postId: postId,
        userId: userId,
      },
    });

    return res.json({
      message: "Comment succesfully posted",
      comment: comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to post the comment",
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
      return res.json({
        message: "Comment deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
    return res.json({
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update the comment",
    });
  }
}

module.exports = { addCommentToPost, deleteComment, updateComment };
