/* eslint-disable linebreak-style */
const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./blogsData')

describe('favorite Blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is empty', () => {
        expect(mostBlogs([])).toEqual({})
    })

    test('when list has only one blog returns the author of that', () => {
        const result = mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1 })
    })

    test('of a bigger list is calculated right', () => {
        //console.log(blogs)
        const result = mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3 })
    })
})
