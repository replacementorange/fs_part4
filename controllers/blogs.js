const blogsRouter = require('express').Router()
const { response } = require('express')
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

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// Blog delete (4.13)
// https://fullstackopen.com/en/part3/node_js_and_express#rest
// https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// Blog put 4.14
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = { 
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
   }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter