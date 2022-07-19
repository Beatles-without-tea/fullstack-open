const blogRouter = require('express').Router()
const Blog = require('../models/blog')




blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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
    const blog = new Blog(request.body)
    try{
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)}
      catch(exception) {
        next(response.status(400))
      }
    })

  module.exports = blogRouter
  