const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 2,
    author: 3,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const regexCheck = /^(?=.{3,}).*$/
  const isValid = password.match(regexCheck)

  if (isValid) {
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await newUser.save()

    return response.status(201).json(savedUser)
  } else {
    return response
      .status(400)
      .json({ error: 'Password must contain minimum of 3 characters' })
  }
})

module.exports = usersRouter
