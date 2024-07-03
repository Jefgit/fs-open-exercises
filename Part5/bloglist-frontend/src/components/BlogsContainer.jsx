import React from 'react'
import Blog from './Blog'

export const BlogsContainer = ({ blogs, handleLiked, handleDelete, username }) => {
  return (
    <div>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLiked = {handleLiked}
          handleDelete={handleDelete}
          username={username}
        />
      )}
    </div>
  )
}
