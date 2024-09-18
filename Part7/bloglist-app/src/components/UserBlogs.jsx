import React from 'react'
import { StyledBlogs } from './styles/Blogs.styled'

const UserBlogs = ({user}) => {
    if(!user){
        return null
    }
  return (
    <StyledBlogs>
        <h1>{user.name}</h1>
        <h3>added blogs</h3>
        <ul>
            {
                user.blogs 
                ? (user.blogs).map((blog) => <li key={blog.id}>{blog.title}</li>)
                : null
            }
        </ul>
    </StyledBlogs>
  )
}

export default UserBlogs