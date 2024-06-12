const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0
  const total =
    blogs.length === 0
      ? 0
      : blogs.reduce((total, current) => total + current.likes, initialValue)

  return total
}

const favoriteBlog = (blogs) => {
  const { title, author, likes } = blogs.reduce((favorite, current) => {
    if (current.likes <= favorite.likes) {
      return favorite
    } else {
      return current
    }
  })

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorArray = _.map(blogs, 'author')
  const mostBlogs = _(blogs).countBy('author').entries().max()

  return { author: mostBlogs[0], blogs: mostBlogs[1] }
}

const mostLikes = (blogs) => {
  const mostLikesAuthor = _(blogs)
    .groupBy('author')
    .mapValues((entries) => _.sumBy(entries, 'likes'))
    .map((likes, author) => ({ likes, author }))
    .maxBy('likes')

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
