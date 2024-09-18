const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response.status(400).json({
      error: 'expected `username` to be unique',
    })
  } else if (
    error.name === 'ValidationError' &&
    error.message.includes('username') &&
    error.message.includes('is shorter than the minimum allowed length (3).')
  ) {
    return response
      .status(400)
      .json({ error: 'Username must contain minimum of 3 characters' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'expired token' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  request.token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : null

  next()
}

const userExtractor = async (request, response, next) => {
  // if (!request.token) {
  //   return response.status(401).json({ error: 'invalid token' })
  // }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  request.user = await User.findById(decodedToken.id)

  next()
}

const blogExtractor = async (request, response, next) => {
  request.blog = await Blog.findById(request.params.id)
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  blogExtractor,
}
