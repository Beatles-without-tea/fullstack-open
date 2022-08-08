const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        "username": "test",
        "name": "word",
        "passwordHash": "123456"
        },
    {
        "username": "test2",
        "name": "word2",
        "passwordHash": "qwertyuiop"
        }
    ]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
})

test('users are returned as json', async () => {
    await api
    .get('/api/users')
    .expect(200)
    .expect('content-Type', /application\/json/)
}, 10000)

test('short username users raises error', async () => {
    await api.post('/api/blogs')
    .send(
        {
            "username": "te",
            "name": "word2",
            "passwordHash": "qwertyuiop"
            }
        
    ).expect(400)
})

test('missing passord raises error', async () => {
    await api.post('/api/blogs')
    .send(
        {
            "username": "te",
            "name": "word2"
            }
        
    ).expect(400)
})