import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlog'
import Togglable from './components/Toggable'
import ExtraBlogDetails from './components/ExtraBlogDetails'
import blogService from './services/blogs'
import loginService from './services/login'
import { deleteBlog, updateBlog } from './functions/helperFunctions'

import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div  className='error'>
      {message}
    </div>
  )
}

const DisplayBlogs = async({setBlogs}) => {
  await blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )  
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [likes, setLikes] = useState(0)
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareNums) )
     
    )  
  }, [])
  function compareNums(a,b) {
    return a.likes - b.likes;
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      console.log('LOGIN SUCCESSFUL')
      console.log(user.username)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        console.log('error')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser') 
    setUser(null) }

  
  
 

  const handleNewBlog = async(event) => {
    event.preventDefault()
    let alreadyCreatedBlog = blogs.map(blog => title === blog.title)
    console.log(alreadyCreatedBlog)
    if (!alreadyCreatedBlog.includes(true)){
      try {
        const creation =  await blogService.create({
            title, author, url, likes
        
        }) 
        await blogService.getAll().then(blogs =>
            setBlogs( blogs.sort(compareNums) )
            
          ) 
        
      } catch (exception) {
        setErrorMessage('wrong')
        setTimeout(() => {
          setErrorMessage(null)
          console.log('error')
        }, 5000)
      }}else{
        setErrorMessage('already created blog')
        setTimeout(() => {
          setErrorMessage(null)
          console.log('error')
        }, 5000)
      }
      
    }
    if (user === null){ 
        return(
          <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
          </div>)} 

      return (
        <div>
        <h1>Blogs</h1>
        <Notification message={errorMessage} />
        <p>{`${user.username} is logged in`}</p>
        <button onClick={handleLogout}>Log out</button>
      
      <h1>create new</h1>
      <Togglable buttonLabel="new blog" exitLabel="cancel">
        <AddBlogForm author={author} url={url} title={title} handleNewBlog={handleNewBlog}
        setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl}/>
      </Togglable>
 
      {blogs.map(blog =>
    
      <div>
        <br></br>
      <div className="contour">
        <Blog key={blog.id} blog={blog} />
        <Togglable buttonLabel="view" exitLabel="hide">
        <ExtraBlogDetails updateBlog={() => updateBlog({blog,compareNums,setBlogs})} deleteBlog={() =>deleteBlog({blog,user,setBlogs,compareNums})} blog={blog}/>
        </Togglable>
      </div>
      <br></br>
      </div>
      )} 
        </div>

      )
}

export default App
