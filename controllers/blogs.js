const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Blog route
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Blog post
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter