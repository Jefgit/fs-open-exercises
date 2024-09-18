const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({})
  return response.json(comments)
})

commentsRouter.post(
  '/:id/comments',
  middleware.blogExtractor,
  async (request, response) => {
    const body = request.body
    const blog = request.blog

    if (!body.comment) {
      return response.status(400).json({
        error: 'text missing',
      })
    }

    const comment = new Comment({
      content: body.comment,
      blog: request.params.id,
    })

    const updatedComment = await comment.save()
    blog.comments = blog.comments.concat(updatedComment._id)
    await blog.save()
    return response.json(updatedComment)
  }
)

module.exports = commentsRouter
