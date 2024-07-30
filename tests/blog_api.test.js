const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const assert = require('assert')

// initialize the database before every test with the beforeEach function
const initialBlogs = [
    {
        title: "My Blog",
        author: "Myself",
        url: "https://www.example.com",
        likes: 12,
        _id: "66a8d0c6d96d254acfc5909d",
        __v: 0
    },
    {
    title: "My Blog n 2",
    author: "Me",
    url: "https://www.example2.com",
    likes: 8,
    _id: "66a8d0c6d96d254acfc5909e",
    __v: 0
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// npm test -- tests/blog_api.test.js
test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

test.only('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const result = response.body[0] // id
    const keys = Object.keys(result) // Returns the names of the enumerable string properties and methods of an object.

    // assert(contents.includes('HTML is easy'))
    //assert(Object.keys(result.includes('id')))
    assert(keys.includes('id')) // includes id
    assert.strictEqual(keys.includes('_id'), false) // includes not _id
  })

after(async () => {
  await mongoose.connection.close()
})