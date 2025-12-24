const { prisma } = require("../lib/prisma");

async function addCommentToPost(req,res) {
    try {
        const postId = req.params.postId;
        const comment = req.body.comment;
        const userId = req.user.id;          // set by auth middleware

        await prisma.comment.create({
            data:{
                commentBody : comment,
                postId  : postId,
                userId : userId,
            }
        })

        res.json({
            message : "Comment succesfully posted",
            comment : comment,
        })

    } catch (error) {
        res.status(500).json({
            error : "Unable to post the comment",
        })
    }
}


module.exports = {addCommentToPost};