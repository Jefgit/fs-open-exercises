import React , { useState } from 'react'

export const NewBlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title:'', author:'', url:'' })

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog(newBlog)
    setNewBlog({ title:'',author:'',url:'' })
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='title'
            type="text"
            value={newBlog.title}
            name='Title'
            onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          />
        </div>
        <div>
            author:
          <input
            id='author'
            type="text"
            value={newBlog.author}
            name='Author'
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          />
        </div>
        <div>
            url:
          <input
          id='url'
            type="text"
            value={newBlog.url}
            name='Url'
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          />
        </div>
        <button className='submitButton' type='submit'>create</button>
      </form>
    </div>
  )
}
