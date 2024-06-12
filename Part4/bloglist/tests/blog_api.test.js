const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('abc123', 10)

  const user = new User({
    username: 'jef',
    passwordHash,
  })

  await user.save()
})

test('blogs are returned as json', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const idLists = blogsAtStart.map((blog) => blog.id)

  assert(idLists)
})

test('unique identifier property of the blog is named id', async () => {
  const blogsAtStart = await helper.blogsInDB()

  const idLists = blogsAtStart.map((blog) => blog.id)
  assert.strictEqual(idLists.length, helper.initialBlogs.length)
})

test('successfully creates a new blog post', async () => {
  const blogsAtStart = await helper.blogsInDB()

  const user = {
    username: 'jef',
    password: 'abc123',
  }

  const userData = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { token } = userData._body

  const newBlog = {
    title: 'Doing Backend Test',
    author: 'Jep Riazonda',
    url: 'https://jepdev.netlify.app/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()

  assert(blogsAtEnd.find((blog) => blog.title === newBlog.title))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
})

test('likes property is missing likes value default to 0', async () => {
  const user = {
    username: 'jef',
    password: 'abc123',
  }

  const userData = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { token } = userData._body

  const newBlog = {
    title: 'Missed likes',
    author: 'Jep Riazonda',
    url: 'https://jepdev.netlify.app/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)

  const blogsAtEnd = await helper.blogsInDB()
  const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title)

  assert.strictEqual(addedBlog.likes, '0')
})

test('blog is not added when title or url properties are missing', async () => {
  const blogsAtStart = await helper.blogsInDB()

  const user = {
    username: 'jef',
    password: 'abc123',
  }

  const userData = await api.post('/api/login').send(user)

  const { token } = userData._body

  const newBlog = {
    author: 'Jep Riazonda',
    likes: 2,
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert(result.body.error.includes('either title or url are missing'))

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('adding a blog fails with the proper status code 401 Unauthorized', async () => {
  const blogsAtStart = await helper.blogsInDB()

  const newBlog = {
    title: 'Doing Backend Test',
    author: 'Jep Riazonda',
    url: 'https://jepdev.netlify.app/',
    likes: 10,
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  assert(result.body.error.includes('invalid token'))

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('deleting a single blog post', async () => {
  const user = {
    username: 'jef',
    password: 'abc123',
  }

  const newBlog = {
    title: 'Doing Backend Test Deletion of blog',
    author: 'Jep Riazonda',
    url: 'https://jepdev.netlify.app/',
    likes: 10,
  }

  const userData = await api.post('/api/login').send(user)
  const { token } = userData._body

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)

  const blogsAtStart = await helper.blogsInDB()

  const blogId = savedBlog._body.id
  await api
    .delete(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  const blogTitle = savedBlog._body.id
  assert(!titles.includes(blogTitle))
})

test('updating the information of an individual blog post', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToUpdate = blogsAtStart[0]
  const blogData = {
    title: 'Updated Things',
    author: 'Just Me',
    url: 'www.updated.com/me',
    likes: '30',
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const updatedBlog = blogsAtEnd.filter((blog) => blog.id === blogToUpdate.id)
  const { title, author, url, likes } = updatedBlog[0]
  assert.deepStrictEqual({ title, author, url, likes }, blogData)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('abc123', 10)

    const user = new User({
      username: 'jef',
      password: passwordHash,
    })

    await user.save()
  })

  test()

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'jef',
      password: 'abcd123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails when password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'jef',
      password: 'ab',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    assert(
      result.body.error.includes(
        'Password must contain minimum of 3 characters'
      )
    )

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails when username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'je',
      password: 'abcd123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    assert(
      result.body.error.includes(
        'Username must contain minimum of 3 characters'
      )
    )

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  mongoose.connection.close()
})
