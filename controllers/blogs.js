const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Blog route
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Blog post
// 31.7 refactor the operation to use async/await instead of promises
// https://fullstackopen.com/en/part4/testing_the_backend#error-handling-and-async-await
blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) { // if title or url is missing
      response.status(400).end() // response with 400
    }

    const blog = new Blog(request.body)
    
    //blog
    //  .save()
    //  .then(result => {
    //    response.status(201).json(result)
    //  })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter