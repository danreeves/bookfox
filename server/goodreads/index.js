import express from 'express'
import passport from 'passport'
import isAuthenticated from './middleware/is-authenticated'
import common from './middleware/common'
import goodreads from './middleware/goodreads'
import { PRODUCTION } from '../env'

let routes = express.Router()

routes = common(routes)
routes = goodreads(routes)

routes.get('/', function(req, res) {
    res.send({ error: 'sorry - not an endpoint' })
})

routes.get('/account', isAuthenticated, function(req, res) {
    res.send({ user: req.user })
})

routes.get('/logout', function(req, res) {
    try {
        console.log(req.logout())
        res
            .clearCookie('bookfox')
            .status(200)
            .send({ success: true, error: null })
    } catch (error) {
        res
            .clearCookie('bookfox')
            .status(500)
            .send({ success: true, error: error })
    }
})

export default routes
