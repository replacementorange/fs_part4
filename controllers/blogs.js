const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Blog route
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Blog post
// 31.7 refactor the operation to use async/await instead of promises
blogsRouter.post('/', async (request, response) => {
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