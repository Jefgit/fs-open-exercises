const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const blog = require('../models/blog')
const { upload } = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  upload.single('thumbnail'),
  async (request, response) => {
    const body = request.body

    if (body.title === '' || body.url === '') {
      return response.status(400).json({
        error: 'either title or url are missing',
      })
    }

    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      imageUrl: request.file.path,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (!user) {
      return response
        .status(401)
        .json({ error: 'You are not authorized to delete this blog' })
    }

    if (!(blog.user.toString() === user._id.toString())) {
      return response
        .status(401)
        .json({ error: 'You are not authorized to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== blog._id.toString()
    )
    await user.save()

    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
