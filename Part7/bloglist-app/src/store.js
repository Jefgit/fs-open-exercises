import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import loginUserReducer from './reducers/loginUserReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    loginUser: loginUserReducer,
    notification: notificationReducer,
    users: usersReducer,
    comments: commentReducer,
  },
})

export default store
