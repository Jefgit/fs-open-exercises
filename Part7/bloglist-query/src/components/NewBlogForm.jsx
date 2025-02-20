import React , { useState } from 'react'
import { Button } from './styles/Button.styled'
import { StyledForm, StyledInput } from './styles/Form.styled'
import { StyledBlogForm } from './styles/BlogForm.styled'
import { BoxContainer } from './styles/BoxContainer.styled'
import { StyledTitle } from './styles/Title.styled'

export const NewBlogForm = ({ handleNewBlog }) => {
  const [details, setDetails] = useState({ title:'', author:'', url:'' })
  const [thumbnail, setThumbnail] = useState(null);

  const addBlog = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('title',details.title)
    formData.append('author',details.author)
    formData.append('url',details.url)
    formData.append('thumbnail', thumbnail)
    handleNewBlog(formData)
    setDetails({ title:'',author:'',url:'' })
  }

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    console.log(e.target.files)
    setThumbnail(e.target.files[0])
  }

  return (
    <StyledBlogForm >
      <StyledTitle>Create new</StyledTitle>
      <StyledForm onSubmit={addBlog}>
        <StyledInput>
          <label htmlFor="title">title</label>
          <input
            id='title'
            type="text"
            value={details.title}
            name='title'
            onChange={handleInputChange}
          />
        </StyledInput>
        <StyledInput>
          <label htmlFor="author">author</label>
            <input
              id='author'
              type="text"
              value={details.author}
              name='author'
              onChange={handleInputChange}
            />
        </StyledInput>
        <StyledInput>
          <label htmlFor="url">url</label>
            <input
            id='url'
              type="text"
              value={details.url}
              name='url'
              onChange={handleInputChange}
            />
        </StyledInput>
        <StyledInput>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input id='thumbnail' type='file' name= 'thumbnail' onChange={handleImageChange} />
        </StyledInput>
        <Button className='submitButton' type='submit'>create</Button>
      </StyledForm>
    </StyledBlogForm >
  )
}
