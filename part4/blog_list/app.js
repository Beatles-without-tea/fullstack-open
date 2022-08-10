const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const middleware = require("./utils/middleware");

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app