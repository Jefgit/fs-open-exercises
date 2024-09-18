import React from 'react'
import { useDispatch } from 'react-redux'
import {addLikes} from '../reducers/blogReducer'
import Comments from './Comments'
import { StyledBlogs } from './styles/Blogs.styled'
import { Button } from './styles/Button.styled'

const BlogView = ({blog}) => {

  const dispatch = useDispatch()
    if(!blog){
        return null
    }

    const handleLiked = async () => {
      try {
        dispatch(addLikes({ ...blog, likes : Number(blog.likes) + 1 }))
      } catch (error) {
        dispatch(setNotification({message: error.response.data.error, isError:true}, 5))
      }
    }

  return (
    <StyledBlogs>
        <h1>{blog.title} {blog.author}</h1>
        <a href="/">{blog.url}</a>
        <p className='likesCount'>likes {blog.likes} <Button onClick={handleLiked} className='likeButton'>like</Button></p>
        <p>added by {blog.user.name}</p>
        <Comments blogId={blog.id}/>
    </StyledBlogs>
  )
}

export default BlogView