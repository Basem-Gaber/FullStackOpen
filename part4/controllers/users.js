/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    if (!request.body.password) {
        const message = "User validation failed: passwrod: Path `password` is required."
        response.json(message).status(400).end()
    }
    else if (request.body.password.length < 3) {
        const message = `User validation failed: password: Path \`password\` (\`${request.body.password}\`) is shorter than the minimum allowed length (3).`
        response.json(message).status(400).end()
    }
    else {
        try {
            const body = request.body

            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })
            const savedUser = await user.save()

            response.json(savedUser)
        } catch (exception) {
            console.error(exception.message)
            response.json(exception.message).status(400).end()
        }
    }
})

module.exports = usersRouter