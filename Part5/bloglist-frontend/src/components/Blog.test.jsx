import { render, screen  } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

describe('Blog List', () => {
  let container
  const blog = {
    title:'Test display title and author',
    author:'Jep',
    likes: 2,
    url:'www.jep.com',
    user:{name: 'jep'}
  }

  const handleLiked = vi.fn()

  beforeEach(() => {
    container  = render(<Blog blog={blog} handleLiked={handleLiked} />).container
  })

  test('display title, and author', () => {
  
    const div = container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent('Test display title and author Jep')

    const detailsDiv = container.querySelector('.moreDetails')
    expect(detailsDiv).toHaveStyle({display: 'none'})
  })
  
  test('the  URL and number of likes are shown ', async () => {
    const buttonView = container.querySelector('.buttonView')
    const user = userEvent.setup()
    await user.click(buttonView)

    const detailsDiv = container.querySelector('.moreDetails')
    screen.findByText('www.jep.com')
    screen.findByText('2')
    expect(detailsDiv).not.toHaveStyle({display: 'none'})
  })

  test('the like button is clicked twice', async () => {
    const likeButton = container.querySelector('.likeButton')
    const user = userEvent.setup()
    await user.dblClick(likeButton)

    expect(handleLiked.mock.calls).toHaveLength(2)
    expect(handleLiked.mock.calls[1][0].likes).toBe(4)
    console.log(handleLiked.mock.calls[1][0].likes)
  })
})

