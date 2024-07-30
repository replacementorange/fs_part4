const mongoose = require('mongoose')

// Blog schema used in database
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

// for defining the id parameter
// https://fullstackopen.com/en/part3/saving_data_to_mongo_db#connecting-the-backend-to-a-database
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)