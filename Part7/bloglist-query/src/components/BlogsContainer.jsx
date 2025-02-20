import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import { Container } from './styles/Container.styled'


export const BlogsContainer = ({ blogs, handleDelete, username }) => {

  
  return (
    <Container>
      {[...blogs].sort((a,b) => b.likes - a.likes).map((blog, index) =>
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          username={username}
          index={index}
        />
      )}
    </Container>
  )
}
