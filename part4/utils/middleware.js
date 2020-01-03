module.exports = {
    tokenExtractor: function (request, response, next) {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            request.token = authorization.substring(7)
        }
        next()
    },
    unknownEndpoint: function (request, response) {
        response.status(404).send({ error: 'unknown endpoint' })
    }
}