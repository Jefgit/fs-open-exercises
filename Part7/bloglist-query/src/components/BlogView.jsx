import React from 'react'
import { useDispatch } from 'react-redux'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import {addLikes} from '../reducers/blogReducer'
import Comments from './Comments'
import { StyledBlogs } from './styles/Blogs.styled'
import { Button } from './styles/Button.styled'
import { updateLikes } from '../requests'
import { useUser } from '../UserContext'

const BlogView = ({blog}) => {

  const dispatch = useDispatch()
  const {state} = useUser()
  const queryClient = useQueryClient()
  const updateLikesMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlog = blogs.map(b => String(b.id) === String(blog.data.id) 
      ? {
          ...blog.data, 
          user: {
            username: state.user.username, 
            name: state.user.name, 
            id: blog.data.user
          }
        } 
      : b)
      queryClient.setQueryData(['blogs'], updatedBlog)

    }
  })

    if(!blog){
        return null
    }

    const handleLiked = async () => {
      try {
        updateLikesMutation.mutate({ ...blog, likes : Number(blog.likes) + 1 })
      } catch (error) {
        dispatch(setNotification({message: error.response.data.error, isError:true}, 5))
      }
    }

  return (
    <StyledBlogs>
        <h1>{blog.title} {blog.author}</h1>
        <img src={`${blog.imageUrl}`} />
        <a href="/">{blog.url}</a>
        <p className='likesCount'>likes {blog.likes} <Button onClick={handleLiked} className='likeButton'>like</Button></p>
        <p>added by {blog.user.name}</p>
        <Comments blogId={blog.id}/>
    </StyledBlogs>
  )
}

export default BlogView