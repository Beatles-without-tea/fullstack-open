import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import ExtraBlogDetails from './ExtraBlogDetails'
import Togglable from './Toggable'
import userEvent from '@testing-library/user-event'
import {updateBlog} from '../functions/helperFunctions'
import blogService from '../services/blogs'
import loginService from '../services/login'




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
      <ExtraBlogDetails updateBlog={() => {}} deleteBlog={() =>{}} blog={blog}/>
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


test('likes are generated', async () => {
    const blog = {
        title: 'like title',
        author: 'like author',
        url: 'www.like_link.com',
        likes: 0
      }
      const username='root'
      const password='sekret'
      const mainUser = await loginService.login({
        username, password })
      blogService.setToken(mainUser.token)
      await blogService.create(blog)
      function compareNums(a,b) {
        return a.likes - b.likes;
      }
      const setBlogs =  (blogs) => {
        return blogs
      }
      let count=0
      const { container } =  render( <Togglable buttonLabel="view" exitLabel="hide">
      <ExtraBlogDetails updateBlog={() => {return count+=1}} deleteBlog={() =>{}} blog={blog}/>
      </Togglable>)
     const user = userEvent.setup()
     const button = container.querySelector('.likeButton')
     await user.click(button)
     console.log('the count is ',count)
     await user.click(button)
     console.log('the count is ',count)

    expect(count).toBe(2)

})
