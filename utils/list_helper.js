//const _ = require('lodash')

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

// receives an array of blogs as a parameter. Function returns the author who has the largest amount of blogs
// https://lodash.com/docs/
// https://lodash.com/docs/#groupBy --> by author
// _.groupBy([6.1, 4.2, 6.3], Math.floor); => { '4': [4.2], '6': [6.1, 6.3] }
// https://lodash.com/docs/#map --> author & info
// https://lodash.com/docs/#maxBy --> most blogs
const mostBlogs = blogs => {
  // return _(blogs).groupBy('author').map((info, author) => ({author: author, blogs: info.lenght})).maxBy(author => author.blogs)
    const occur = blogs.reduce((max, blog) => {
      max[blog.author] = (max[blog.author] || 0 ) + 1
      return max
    }, {})

    const most = Object.keys(occur).reduce((a, b) => occur[a] > occur[b]
      ? { author: a, blogs: occur[a] }
      : { author: b, blogs: occur[b] }
    )
    return most
}

// same as prev but most liked
const mostLikes = blogs => {
  const likes = blogs.reduce((max, blog) => {
    max[blog.author] = (max[blog.author] || 0) + blog.likes
    return max
  }, {})
  
  const most = Object.keys(likes).reduce((a, b) => likes[a] > likes[b] ? a : b)
  const mostLiked = { author: most, likes: likes[most] }

  return mostLiked
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }