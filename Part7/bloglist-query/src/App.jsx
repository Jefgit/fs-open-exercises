import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
import { addLikes, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { setLoginUser } from './reducers/loginUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeComments } from './reducers/commentReducer'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'
import { getBlogs, getUsers, createBlog, setToken, updateLikes, removeBlog } from './requests'

import { useUser } from './UserContext'
import { useNotification } from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const newBlogRef = useRef()
  const dispatch = useDispatch()
  const {login, state} = useUser() 
  const {showNotification} = useNotification()

  const queryClient = useQueryClient()

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  console.log(JSON.parse(JSON.stringify(resultBlogs)))

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat({...blog.data, user:
        {username: state.user.username, name: state.user.name, id: blog.data.user}}))

      const newMessage = `a new blog ${blog.data.title} by ${blog.data.author} added`
      showNotification({canShow:true, isError: false, message: newMessage})
    },
    onError: (error) => {
      console.log(error)
      showNotification({
        canShow:true,
        isError:true,
        message: error.response.data.error,
    })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const deleted = blogs.find(b => String(b.id) === String(id))
      console.log('this',deleted)
      const updatedBlog = blogs.filter(b => String(b.id) !== String(id))
      queryClient.setQueryData(['blogs'], updatedBlog)
      console.log('that',updatedBlog)

      const newMessage = `Blog ${deleted.title} successfully deleted!`
      showNotification({
        canShow:true,
        isError:false,
        message: newMessage,
    })

    },
    onError: (error) => {
      showNotification({
        canShow:true,
        isError:true,
        message: error,
    })
  }
  })

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

  const users = resultUsers.data ? resultUsers.data : []
  const blogs = resultBlogs.data ? resultBlogs.data : []

  console.log(blogs)
  
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
      login(user)
      setToken(user.token)
    }
  },[])

  const handleNewBlog = async (newBlog) => {
      createBlogMutation.mutate(newBlog)
      newBlogRef.current.toggleVisibility()
  }

  const handleDelete = async (id, title) => {
    try {
      deleteBlogMutation.mutate(id)
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
          state.isAuthenticated &&
          <Navigation />
        }
        <Routes>
          <Route
            path='/' 
            element={
              state.isAuthenticated
              ? 
                <Blogs
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
                state.isAuthenticated 
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
                state.isAuthenticated 
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