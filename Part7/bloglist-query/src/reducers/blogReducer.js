import {
  createActionCreatorInvariantMiddleware,
  createSlice,
} from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import commentServices from '../services/comments'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => String(blog.id) != String(action.payload))
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        String(blog.id) !== String(action.payload.id)
          ? blog
          : { ...blog, likes: Number(blog.likes) + 1 }
      )
    },
  },
})

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogServices.create(content)
    console.log(blog)
    // dispatch(appendBlog(blog))
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogServices.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const addLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.updateLike(blog)
    console.log(updatedBlog, 'vlog')
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
