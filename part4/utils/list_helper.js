/* const dummy = (blogs) => {
  return 1
} */

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => {
    //console.log(blog.likes)
    sum += blog.likes
    // console.log(sum)
  })
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let max = 0
  let maxIndex = 0
  blogs.map((blog, i) => {
    if (blog.likes > max) {
      max = blog.likes
      maxIndex = i
    }
  })
  let mostLikes = blogs[maxIndex]
  return mostLikes
}

module.exports = {
  totalLikes, favoriteBlog
}