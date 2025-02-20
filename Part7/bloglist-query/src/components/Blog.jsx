import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledBlog } from './styles/Blogs.styled'
import { useUser } from '../UserContext'
import { Button } from './styles/Button.styled'

const Blog = ({ blog, handleDelete, index }) => {

  const {state} = useUser()
  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleDelete(blog.id, blog.title)
    }
  }
  return(
    <StyledBlog 
      key={blog.id} 
      bg={index % 2 === 0 ? '#FB8500' : '#FFB703'}
      color={index % 2 === 0 ? '#fff' : '#ffe'}
    >
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <img src={blog.imageUrl} />
      {state.user.username === blog.user.username && <Button onClick={removeBlog} bg={`#7E2811`}>delete</Button>}
    </StyledBlog>
  )
}

export default Blog