import React from 'react'
import { Togglable } from './Togglable'
import { BlogsContainer } from './BlogsContainer'
import { NewBlogForm } from './NewBlogForm'
import { StyledBlogs } from './styles/Blogs.styled'

const Blogs = ({blogs, newBlogRef, handleNewBlog, handleDelete, username}) => {
  return (
    <StyledBlogs>
        <Togglable buttonLabel ='create new blog' ref={newBlogRef}>
            <NewBlogForm handleNewBlog = {handleNewBlog} />
        </Togglable>
        <BlogsContainer
            blogs = {blogs}
            handleDelete= {handleDelete}
            username = {username}
        />  
    </StyledBlogs>
  )
}

export default Blogs