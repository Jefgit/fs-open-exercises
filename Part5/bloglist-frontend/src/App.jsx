import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { LogInForm } from './components/LogInForm'
import { BlogsContainer } from './components/BlogsContainer'
import { NewBlogForm } from './components/NewBlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs.length])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      newBlogRef.current.toggleVisibility()
      setIsError(false)
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    }

  }

  const handleLiked = async (blog) => {
    try {
      const updatedBlog = await blogService.updateLike(blog)
      console.log(updatedBlog)
      const reduceBlogs = blogs.filter(blog => blog.id !== updatedBlog.id)
      const updatedLikesBlogs = reduceBlogs.concat(updatedBlog)
      setBlogs(updatedLikesBlogs)
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)

      const blogsFiltered = blogs.filter(blog => String(blog.id) !== String(id))
      setBlogs(blogsFiltered)

    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      {message !== '' && <Notification isError = {isError} message = {message} />}
      {
        user === null
          ? <LogInForm
            handleLogin = {handleLogin}
            username = {username}
            password = {password}
            setUsername = {setUsername}
            setPassword = {setPassword}
          />
          : <div>
            <h2>blogs</h2>
            <div>
              <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>
            </div>
            <Togglable buttonLabel ='create new blog' ref={newBlogRef}>
              <NewBlogForm handleNewBlog = {handleNewBlog} />
            </Togglable>
            <BlogsContainer
              blogs = {blogs}
              handleLiked = {handleLiked}
              handleDelete= {handleDelete}
              username = {user.username}
            />
          </div>
      }
    </div>
  )
}

export default App