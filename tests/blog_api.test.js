const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const assert = require('assert')

const initialBlogs = helper.initialBlogs
const nonExistingId = helper.nonExistingId
const blogsInDb = helper.blogsInDb

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
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
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

  test.only('POST successfully creates a new blog post', async () => {
    const newBlog =   {
      title: "Ekan luokan testit",
      author: "Roope S. MArtti",
      url: "http://blog.dirtycode.xd/",
      likes: 9
    }

    // https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    //const response = await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(b => b.title) //response.body.map(r => r.title)

    // verify the total number of blogs in the system is increased by one
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    // verify that the content of the blog post is saved correctly to the database
    //assert(contents.includes('Ekan luokan testit')) --> turn to contents have something
    assert(contents.includes(newBlog.title))
  })

after(async () => {
  await mongoose.connection.close()
})