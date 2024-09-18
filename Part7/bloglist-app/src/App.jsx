import { useState, useEffect, useRef } from 'react'
import {ThemeProvider} from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from './components/styles/Global'
import {
  Routes, Route, Link,
  Navigate,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import Users from './components/Users'
import { LogInForm } from './components/LogInForm'
import Blogs from './components/Blogs'
import { Notification } from './components/Notification'
import UserBlogs from './components/UserBlogs'
import { addLikes, createBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { setLoginUser } from './reducers/loginUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeComments } from './reducers/commentReducer'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const newBlogRef = useRef()
  const dispatch = useDispatch()

  const theme = {
    colors: {
      body: '#8ECAE6',
      header:'#219EBC',
      footer:'#023047',
      bg:'#FFB703',
      content:'#FB8500',
    },
    mobile: '768px'
  }

  const location = useLocation()
  const navigate = useNavigate()
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const loggedInUser = useSelector(({loginUser}) => loginUser)
  const users = useSelector(({users}) => users)
  const blogs = useSelector(({blogs}) => blogs)

  console.log(users)
  
  const user = matchUser
                ? users.find( user => user.id === matchUser.params.id) 
                : null
   
  const blog = matchBlog 
              ? blogs.find( blog => blog.id === matchBlog.params.id) 
              : null
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoginUser(user))
      blogService.setToken(user.token)
    }
  },[])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setLoginUser(null))
    navigate('/login')
  }

  const handleNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      newBlogRef.current.toggleVisibility()
      const newMessage = `a new blog ${newBlog.title} by ${newBlog.author} added`
      dispatch(setNotification({message: newMessage, isError:false}, 5))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error, isError:true}, 5))
    }

  }

  const handleDelete = async (id, title) => {
    try {
      dispatch(deleteBlog(id))

      const newMessage = `Blog ${title} successfully deleted!`
      dispatch(setNotification({message: newMessage, isError:false}, 5))
    } catch (error) {
      dispatch(setNotification({message: error.response.data.error, isError:true}, 5))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Notification/>
        {
          loggedInUser &&
          <Navigation loggedInUser={loggedInUser} handleLogout={handleLogout} />
        }
        <Routes>
          <Route
            path='/' 
            element={
              loggedInUser 
              ? <Blogs
                  blogs = {blogs} 
                  newBlogRef = {newBlogRef}
                  handleNewBlog = {handleNewBlog}
                  handleDelete = {handleDelete}
                  username = {username}
                />
              : <Navigate replace to='/login' />
              } 
            />
            <Route 
              path='/users' 
              element={
                loggedInUser 
                ? <Users users = {users} /> 
                : <Navigate replace to='/login' />
                } 
            />
            <Route
              path='/users/:id'
              element={<UserBlogs user={user} />}
            />
            <Route
              path='/blogs/:id'
              element={<BlogView blog={blog}/>}
            />
            <Route 
              path='/login' 
              element= {
                loggedInUser 
                ? <Navigate replace to ='/' />
                  :<LogInForm
                    username = {username}
                    password = {password}
                    setUsername = {setUsername}   
                    setPassword = {setPassword}
                  />
              } 
            />
          </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App