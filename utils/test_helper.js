const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
}