const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')


const blogsRouter = require('./controllers/blog')
const {MONGODB_URI, PORT} = require('./utils/config')


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app