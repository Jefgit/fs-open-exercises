import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = () =>
  axios.get(`${baseUrl}/blogs`).then((res) => res.data)

export const getUsers = () =>
  axios.get(`${baseUrl}/users`).then((res) => res.data)

export const createBlog = (newBlog) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  }

  const res = axios.post(`${baseUrl}/blogs`, newBlog, config)
  return res
}

export const updateLikes = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = axios.put(`${baseUrl}/blogs/${blog.id}`, blog, config)
  return res
}

export const removeBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = axios.delete(`${baseUrl}/blogs/${id}`, config)

  return id
}
