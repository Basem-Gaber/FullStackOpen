/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //console.log(blogs)
    const reducer = (sum, item) => sum + item.likes
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => (max.likes > blog.likes) ? max : blog
    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer)
}
const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    const reducer = (max, author) => (max.blogs > author.blogs) ? max : author
    const result = lodash.chain(blogs).groupBy('author').map((value, key) => ({ author: key, blogs: value.length })).value()
    //console.log(result)
    return result.reduce(reducer)
}
const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    const totalLikesReducer = (sum, item) => sum + item.likes
    const maxReducer = (max, author) => (max.likes > author.likes) ? max : author
    const result = lodash.chain(blogs).groupBy('author').map((value, key) => ({ author: key, likes: value.reduce(totalLikesReducer, 0) })).value()
    //console.log(result)
    return result.reduce(maxReducer)
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}