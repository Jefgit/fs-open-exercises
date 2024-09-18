import React, { useEffect, useState } from 'react'
import { addComment } from '../reducers/commentReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments } from '../reducers/commentReducer'
import { Button } from './styles/Button.styled'
import { StyledCommentSection, StyledComments } from './styles/Comment.styled'

const Comments = ({blogId}) => {

    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const rawComments = useSelector(({comments}) => comments)
    const comments = rawComments.filter((comment) => comment.blog === blogId)
    console.log(comments)
    useEffect(()=> {
      dispatch(initializeComments(blogId))
    },[])

    const handleComments = (event) => {
      event.preventDefault()
      dispatch(addComment(event.target.content.value, blogId))
    }

  return (
    <div>
        <h3>Comments</h3>
        <StyledCommentSection>
          <form onSubmit={handleComments}>
              <textarea name='content' type="text" cols={60} rows={10}/>
              <Button 
                type='submit'
                value={comment}
                onChange={({target}) => setComment(target.value)}
              >
                add comment
              </Button>
          </form>
        </StyledCommentSection>
        <StyledComments>
            { 
              comments
              ? comments.map(comment => <li key={comment.id}>{comment.content}</li>)
              : null
            }
        </StyledComments>
    </div>
  )
}

export default Comments