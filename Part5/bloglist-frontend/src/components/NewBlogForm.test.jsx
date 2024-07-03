import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewBlogForm } from './NewBlogForm'

test(' when a new blog is created', async () => { 
  const handleNewBlog = vi.fn()

  const { container } = render(<NewBlogForm handleNewBlog={handleNewBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const url = container.querySelector('#url')
  const user = userEvent.setup()

  await user.type(titleInput, 'Testing new blog')
  await user.type(authorInput, 'jep')
  await user.type(url, 'www.jep.com')

  const submitButton = container.querySelector('.submitButton')
  await user.click(submitButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe('Testing new blog')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('jep')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('www.jep.com')
 })