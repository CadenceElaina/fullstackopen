import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> the form calls the event handler it received as props with the right details when a new blog is created.", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)
  //render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')

  const sendButton = screen.getByText('create')
  //const sendButton = screen.querySelector('create-blog')

  await user.type(inputs[0], 'title')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], "https://www.fullstackopen.com")
  await user.click(sendButton)

  //screen.debug()
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('title')
  expect(createBlog.mock.calls[0][1]).toBe('author')
  expect(createBlog.mock.calls[0][2]).toBe("https://www.fullstackopen.com");

})