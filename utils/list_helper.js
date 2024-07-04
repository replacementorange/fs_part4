// dummy that returns 1
const dummy = (blogs) => {
    return 1
  }

// sum of numbers in array
const totalLikes = (blogs) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const sumOfLikes = blogs.reduce((sum, blog) => {
      return sum +  blog.likes
    }, 0)
    return sumOfLikes
  }

  module.exports = {
    dummy, totalLikes
  }