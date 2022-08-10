const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User  = require ('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users')
    response.json(blogs)
  }) 

blogRouter.delete('/:id', async (request, response,next) => {
    const blogs = await Blog.findByIdAndDelete(request.params.id)
    try{
    response.status(204).json({
      status: "deleted succesfully",
    })
  } catch(error) {
    console.log(error.name)
    next(error)
  }

  })
  
blogRouter.post('/', async (request, response,next) => {
    const token = getTokenFrom(request)
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      users: request.body.users
    })
      .populate('users',{username: 1, name:1})


    try{
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      response.status(201).json(savedBlog)}
      catch(exception) {
        next(response.status(400))
      }
    })
  
blogRouter.put('/:id', async (request,response,next) =>{
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true})
  
  try{
   response.status(200).json({
    status: "updated succesfully",
  })
  }catch(exception){
    next(response.status(400))
  }
})

module.exports = blogRouter
  