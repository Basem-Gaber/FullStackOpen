/* eslint-disable linebreak-style */
const blogsRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

blogsRouter.use(bodyParser.json())

//const Blog = mongoose.model('Blog', blogSchema)

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedblog = await blog.save()
        user.blogs = user.blogs.concat(savedblog._id)
        await user.save()
        response.json(savedblog.toJSON())
    } catch (exception) {
        console.log(exception.message)
        response.json(exception.message).status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    console.log('recieved delete request')
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndDelete(request.params.id)
            console.log('deleted success')
            response.json('Deleted Blog').status(204).end()
        }
        else {
            return response.status(401).json({ error: 'deleting a blog is possible only by the blog\'s creator.' })
        }
    } catch (exception) {
        console.log(exception.message)
        response.json(exception.message).status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    }

    console.log('inside put')
    try {
        console.log(request.params.id)
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
        console.log('updates success')
    } catch (exception) {
        console.error(exception)
        response.status(400).end()
    }
})

module.exports = blogsRouter