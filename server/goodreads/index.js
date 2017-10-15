const express = require('express')
const { Router, json } = express

const routes = Router()

routes.use(json())

routes.get('/', function(req, res) {
    res.send({ error: 'sorry - not an endpoint' })
})

routes.get('/about', function(req, res) {
    res.send('About birds')
})

module.exports = routes
