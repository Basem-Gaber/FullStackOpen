/* eslint-disable linebreak-style */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
app.use(middleware.tokenExtractor)
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/login', loginRouter)
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
console.log('Connected successfully to mongoDB')

module.exports = app
