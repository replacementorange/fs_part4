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

// receives a list of blogs as a parameter, finds out which blog has the most likes and returns it
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// {
//  title: "Canonical string reduction",
//  author: "Edsger W. Dijkstra",
//  likes: 12
//}
const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((favorite, blog) => {
        return favorite.likes > blog.likes
        // if favorite have more likes -> returns it, else returns blog
        ? {title: favorite.title, author: favorite.author, likes: favorite.likes}
        : {title: blog.title, author: blog.author, likes: blog.likes}
    })
    return mostLiked
  }

module.exports = {
    dummy, totalLikes, favoriteBlog
  }