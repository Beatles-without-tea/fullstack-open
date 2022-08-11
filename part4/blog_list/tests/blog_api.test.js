const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User  = require ('../models/user')
const bcrypt = require('bcrypt')



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


const start = (async () =>{
    const passwordHash = await bcrypt.hash("random_password", 10);
    const user = await new User({ username: "test_user", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET);
    return token
})
token = start()

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

test('post method works', async () =>{
    const response = await api.get('/api/blogs')
    const prePostLength = response.body.length
    const responsePost = await api.post('/api/blogs')
    .set("Authorization", `Bearer ${token}`)
    .send(
        {
            "title":"brand new blog", "author":"John Wick",
            "url" : "www.the_continental.com", "likes": 1500
        }
    ).expect(201).expect('Content-Type', /application\/json/)

    const PostPostLength = responsePost.body.length
    expect(PostPostLength === prePostLength+1)

})


// test('post method fails without authorization', async () =>{
//     const response = await api.get('/api/blogs')
//     const prePostLength = response.body.length
//     const responsePost = await api.post('/api/blogs')
//     .set("Authorization", `Bearer wrongtoken`)
//     .send(
//         {
//             "title":"brand new blog", "author":"John Wick",
//             "url" : "www.the_continental.com", "likes": 1500
//         }
//     ).expect(401)

//     const PostPostLength = responsePost.body.length
//     expect(PostPostLength === prePostLength)

// })

test('likes defaults to 0', async () => {
    const responsePost = await api.post('/api/blogs')
    .send(
        {
            "title":"likeless", "author":"No likes person",
            "url" : "www.sad_no_likes.com"
        }
    ).set("Authorization", `Bearer ${token} `)
    .expect(201).expect('Content-Type', /application\/json/)
    const reponse = await api.get('/api/blogs')
    const newPost = reponse.body[2]
    expect(newPost.likes) === 0

})

test('missing data results in 400' , async() => {
    const response = await api.post('/api/blogs')
    .send(
        {
         "author":"No title person", "likes" :10
        }
    ).set("Authorization", `Bearer ${token} `).expect(400)
})

// test('test delete ID' , async() => {
//     const response = await api.get('/api/blogs')
//     const id = response.body[0].id
//     const responseDelete = await api.delete(`/api/blogs/${id}`)
//     .set("Authorization", `Bearer ${token} `)
//     .expect(204)
    
// },10000)

test('test put data', async() => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const responsePut = await api.put(`/api/blogs/${id}`).send(
    {'title':'new title','author': 'new author','likes':5}
    ).expect(200)
},10000)

afterAll(() => {
    mongoose.connection.close()
  })