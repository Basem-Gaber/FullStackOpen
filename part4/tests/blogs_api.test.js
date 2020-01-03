/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./../app')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = require('./blogsData')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('deleted')

    for (let blog of blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is correct number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogs.length)
})

test('some title is as expected', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('First class tests')
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Test title',
        author: 'Basem M. Gaber',
        url: 'http://www.test.com',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(blogs.length + 1)
    expect(titles).toContain('Test title')
})

test('blog without content is not added', async () => {
    const newBlog = {
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogs.length)
})

test('blog without likes is defaulted to 0', async () => {
    const newBlog = {
        title: 'Test title 2',
        author: 'Basem M. Gaber',
        url: 'http://www.test.com/2'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const justAdded = response.body.find(r => r.title === 'Test title 2')

    expect(response.body.length).toBe(blogs.length + 1)
    expect(justAdded.likes).toBe(0)
})
/*

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        jest.setTimeout(30000)
        const blogsAtStart = await api.get('/api/blogs')
        console.log(blogsAtStart.body)
        const blogToDelete = blogsAtStart.body[0]
        console.log(blogToDelete)
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        console.log('deleted')
        const blogsAtEnd = await api.get('/api/blogs')
        console.log('after delete')
        expect(blogsAtEnd.body.length).toBe(
            blogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})
*/
afterAll(() => {
    mongoose.connection.close()
})