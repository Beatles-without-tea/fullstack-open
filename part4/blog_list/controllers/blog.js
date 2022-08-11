const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User  = require ('../models/user')
const jwt = require('jsonwebtoken')




blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users')
    response.json(blogs)
  }) 

blogRouter.delete('/:id', async (request, response,next) => {    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    
    const blogs = await Blog.findById(request.params.id)
    console.log(blogs.users.toString())
    console.log(decodedToken.id.toString())
    if (blogs.users.toString() === request.user.id){
      console.log(request.params.id)
      await blogs.deleteOne({_id: request.params.id} );
      response.status(204).json({
        status: "deleted succesfully",
  })
 } else {
    response.status(401).json({'error':"unallowed"})
  }

  })

blogRouter.post('/', async (request, response,next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
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
  