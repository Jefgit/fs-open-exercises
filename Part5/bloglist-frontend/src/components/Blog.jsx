import { useState } from 'react'

const Blog = ({ blog, handleLiked, handleDelete, username }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] =useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5,
  }

  const hideWhenShown = { display : showDetails ? 'none' : '' }
  const displayWhenShown = { display : showDetails ? '': 'none' }

  const handleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLikeCount = () => {
    handleLiked({ ...blog, likes : Number(likes) + 1 })
    setLikes( prevLikes => Number(prevLikes) + 1)

  }

  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleDelete(blog.id)
    }
  }
  return(
    <article style={blogStyle} key={blog.id}>
      <div className='titleAndAuthor'>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenShown}>
        <button style={hideWhenShown} onClick={handleDetails} className='buttonView'>view</button>
      </div>
      <div>
        <button style={displayWhenShown} onClick={handleDetails}>hide</button>
      </div>
      <div style={displayWhenShown} className='moreDetails'>
        <p>{blog.url}</p>
        <p className='likesCount'>likes {likes} <button onClick={addLikeCount} className='likeButton'>like</button></p>
        <p>{blog.user.name}</p>
        {username === blog.user.username && <button onClick={removeBlog}>remove</button>}
      </div>
    </article>
  )
}

export default Blog