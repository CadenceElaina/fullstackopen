import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "https://www.test.com/",
    likes: 0,
    user: {
      username: "mluukai",
      name: "Matti Luukainen"
    }
  }

  let container;
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} updateLikes={mockHandler} />).container
  })

  test('renders content', () => {
    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const details = container.querySelector('.blog-details')
    //const url = screen.queryByText('https://www.test.com/')
    //const likes = screen.queryByText(0)

    expect(title).toHaveTextContent(
      'Title'
    )
    expect(author).toHaveTextContent(
      'Author'
    )
    expect(details).toHaveStyle('display: none')
    /* expect(url).toBeNull()
    expect(likes).toBeNull() */
  })

  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked.", async () => {
    const toggleButton = container.querySelector(".toggle-button")
    const user = userEvent.setup()

    await user.click(toggleButton)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toBeInTheDocument()
    expect(blogDetails).not.toHaveStyle('display: none')
  })

  test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const toggleButton = container.querySelector(".toggle-button")
    const user = userEvent.setup()

    await user.click(toggleButton)

    const likeButton = container.querySelector('.like-button')
    /*     const blogLikes = container.querySelector('.blog-likes') */

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
    /*    expect(blogLikes).toHaveTextContent("2") */
  })
})


/* describe('<Blog />', () => {
  let component;

  const blog = {
    title: 'example',
    author: 'cadence',
    url: 'https://www.fullstackopen.com',
    likes: 1
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  test("the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.", () => {

    expect(component.container.querySelector(".title")).toHaveTextContent(
      blog.title
    )

  })
}) */