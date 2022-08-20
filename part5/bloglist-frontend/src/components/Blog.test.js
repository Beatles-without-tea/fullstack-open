import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import ExtraBlogDetails from './ExtraBlogDetails'
import Togglable from './Toggable'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'john',
        url: 'www.link.com',
        likes: 10
      }

  const { container } =  render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'john'
  )
})

test('url and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'john',
        url: 'www.link.com',
        likes: 10
      }

      const { container } =  render( <Togglable buttonLabel="view" exitLabel="hide">
      <ExtraBlogDetails updateBlog={() => updateBlog({blog,compareNums,setBlogs})} deleteBlog={() =>deleteBlog({blog,user,setBlogs,compareNums})} blog={blog}/>
      </Togglable>)
     const user = userEvent.setup()
     const button = container.querySelector('.toggleButton')
     await user.click(button)
     const div = container.querySelector('.extraDetail')
     expect(div).toHaveTextContent(
        '10'
      )
      expect(div).toHaveTextContent(
        'www.link.com'
      )



})


