import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledBlog } from './styles/Blogs.styled'

const Blog = ({ blog, handleDelete, username, index }) => {
  const [showDetails, setShowDetails] = useState(false)


  const hideWhenShown = { display : showDetails ? 'none' : '' }
  const displayWhenShown = { display : showDetails ? '': 'none' }

  const handleDetails = () => {
    setShowDetails(!showDetails)
  }

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
    </StyledBlog>
  )
}

export default Blog