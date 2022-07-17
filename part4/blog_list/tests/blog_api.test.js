const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      "title": "The wonderfulworld of Superdogman",
      "author": "max the magnanimous",
      "url": "www.idk.com",
      "likes": 500000
    },
    {
      "title": "super dogman",
      "author": "09678978393",
      "url": "www.test_link.com",
      "likes": 10000
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-Type', /application\/json/)
}, 10000)


test('blogs are correct lenth', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('id exists', async() => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})


afterAll(() => {
    mongoose.connection.close()
  })