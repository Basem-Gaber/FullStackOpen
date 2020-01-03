/* eslint-disable linebreak-style */
const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./blogsData')

describe('Blog with most likes', () => {
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
        expect(mostLikes([])).toEqual({})
    })

    test('when list has only one blog returns the author of that', () => {
        const result = mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5 })
    })

    test('of a bigger list is calculated right', () => {
        //console.log(blogs)
        const result = mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17 })
    })
})
