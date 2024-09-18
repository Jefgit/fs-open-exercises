import React , { useState } from 'react'
import { Button } from './styles/Button.styled'
import { StyledForm, StyledInput } from './styles/Form.styled'
import { StyledBlogForm } from './styles/BlogForm.styled'
import { BoxContainer } from './styles/BoxContainer.styled'
import { StyledTitle } from './styles/Title.styled'

export const NewBlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title:'', author:'', url:'' })

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog(newBlog)
    setNewBlog({ title:'',author:'',url:'' })
  }
  return (
    <StyledBlogForm >
      <StyledTitle>Create new</StyledTitle>
      <StyledForm onSubmit={addBlog}>
        <StyledInput>
          <label for="title">title</label>
          <input
            id='title'
            type="text"
            value={newBlog.title}
            name='Title'
            onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          />
        </StyledInput>
        <StyledInput>
        <label for="author">author</label>
          <input
            id='author'
            type="text"
            value={newBlog.author}
            name='Author'
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          />
        </StyledInput>
        <StyledInput>
        <label for="url">url</label>
          <input
          id='url'
            type="text"
            value={newBlog.url}
            name='Url'
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          />
        </StyledInput>
        <Button className='submitButton' type='submit'>create</Button>
      </StyledForm>
    </StyledBlogForm >
  )
}
