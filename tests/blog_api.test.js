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
//blogsRouter.get('/api/blogs'', async (request, response) => { 
//    const blogs = await Blog.find({})
//    response.json(blogs)
//  })

test.only('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

after(async () => {
  await mongoose.connection.close()
})